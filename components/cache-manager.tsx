"use client";

import { useEffect } from "react";
import { startCacheCleanup } from "../lib/cache";

export function CacheManager({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Start periodic cache cleanup (every 60 seconds)
    const stopCleanup = startCacheCleanup(60000);

    return () => {
      stopCleanup();
    };
  }, []);

  return <>{children}</>;
}
