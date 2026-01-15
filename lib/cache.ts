// Cache utilities for S3 file manager

// ============================================
// 1. Presigned URL Cache (with TTL)
// ============================================
interface CachedUrl {
  url: string;
  expiresAt: number; // timestamp
}

class PresignedUrlCache {
  private cache: Map<string, CachedUrl> = new Map();
  private readonly defaultTTL = 14 * 60 * 1000; // 14 minutes (URLs usually expire in 15 min)

  set(key: string, url: string, ttlMs?: number): void {
    const expiresAt = Date.now() + (ttlMs || this.defaultTTL);
    this.cache.set(key, { url, expiresAt });
  }

  get(key: string): string | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return cached.url;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clear expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

export const urlCache = new PresignedUrlCache();

// ============================================
// 2. Image Blob Cache (in-memory)
// ============================================
interface CachedImage {
  blob: Blob;
  objectUrl: string;
  timestamp: number;
}

class ImageBlobCache {
  private cache: Map<string, CachedImage> = new Map();
  private readonly maxSize = 50; // Max number of images to cache
  private readonly maxAgeMs = 30 * 60 * 1000; // 30 minutes

  async set(key: string, imageUrl: string): Promise<string> {
    // Check if already cached
    const existing = this.get(key);
    if (existing) return existing;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      // Cleanup old entries if cache is full
      if (this.cache.size >= this.maxSize) {
        this.evictOldest();
      }

      this.cache.set(key, {
        blob,
        objectUrl,
        timestamp: Date.now(),
      });

      return objectUrl;
    } catch (error) {
      console.error("Failed to cache image:", error);
      return imageUrl; // Return original URL on failure
    }
  }

  get(key: string): string | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > this.maxAgeMs) {
      this.delete(key);
      return null;
    }

    return cached.objectUrl;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    const cached = this.cache.get(key);
    if (cached) {
      URL.revokeObjectURL(cached.objectUrl);
      this.cache.delete(key);
    }
  }

  clear(): void {
    for (const cached of this.cache.values()) {
      URL.revokeObjectURL(cached.objectUrl);
    }
    this.cache.clear();
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.maxAgeMs) {
        this.delete(key);
      }
    }
  }
}

export const imageCache = new ImageBlobCache();

// ============================================
// 3. File List Cache Key Generator
// ============================================
export function getFileListCacheKey(
  bucketName: string,
  path: string,
  credentials: { accessKey: string; region: string }
): string {
  return `${bucketName}:${path}:${credentials.accessKey}:${credentials.region}`;
}

// Periodic cleanup (call this on app init or on interval)
export function startCacheCleanup(intervalMs: number = 60000): () => void {
  const intervalId = setInterval(() => {
    urlCache.cleanup();
    imageCache.cleanup();
  }, intervalMs);

  return () => clearInterval(intervalId);
}
