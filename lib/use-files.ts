"use client";

import useSWR from "swr";
import axios from "axios";
import { S3File, S3Bucket } from "../app/[bucket-name]/components/types";
import { getDemoFilesForPath } from "./demo-data";

interface UseFilesOptions {
  bucketCredentials: S3Bucket | null;
  currentPath: string;
  isDemo: boolean;
}

interface UseFilesReturn {
  files: S3File[];
  isLoading: boolean;
  isValidating: boolean;
  error: Error | null;
  mutate: () => Promise<S3File[] | undefined>;
}

// Fetcher function for SWR
const fileFetcher = async ([url, params]: [
  string,
  Record<string, string>
]): Promise<S3File[]> => {
  const response = await axios.get(url, { params });
  return response.data.items || [];
};

export function useFiles({
  bucketCredentials,
  currentPath,
  isDemo,
}: UseFilesOptions): UseFilesReturn {
  // Create a unique cache key
  const cacheKey = bucketCredentials
    ? isDemo
      ? ["demo", currentPath]
      : [
          `/api/s3/${encodeURIComponent(bucketCredentials.name)}/files`,
          {
            prefix: currentPath,
            accessKey: bucketCredentials.accessKey,
            secretKey: bucketCredentials.secretKey,
            region: bucketCredentials.region,
          },
        ]
    : null;

  const { data, error, isLoading, isValidating, mutate } = useSWR<S3File[]>(
    cacheKey,
    // Custom fetcher that handles demo mode
    async (key) => {
      if (Array.isArray(key) && key[0] === "demo") {
        // Demo mode - return demo files
        return getDemoFilesForPath(key[1] as string);
      }
      // Real S3 fetch
      return fileFetcher(key as [string, Record<string, string>]);
    },
    {
      revalidateOnFocus: false, // Don't refetch on window focus
      revalidateOnReconnect: true, // Refetch on reconnect
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      keepPreviousData: true, // Show stale data while revalidating
      errorRetryCount: 2, // Retry failed requests twice
    }
  );

  return {
    files: data || [],
    isLoading,
    isValidating,
    error: error || null,
    mutate: async () => mutate(),
  };
}
