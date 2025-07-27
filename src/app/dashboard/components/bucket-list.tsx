"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Server, FolderOpen, Globe } from "lucide-react";

interface S3Bucket {
  id: string;
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  dateAdded: string;
}

interface BucketListProps {
  buckets: S3Bucket[];
  selectedBucket: S3Bucket | null;
  onSelectBucket: (bucket: S3Bucket) => void;
  awsRegions: Array<{ value: string; label: string }>;
}

export function BucketList({
  buckets,
  selectedBucket,
  onSelectBucket,
  awsRegions,
}: BucketListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
        Your Buckets ({buckets.length})
      </h2>
      {buckets.length === 0 ? (
        <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
          <Server className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No buckets added yet</p>
          <p className="text-sm">Add your first S3 bucket to get started</p>
        </div>
      ) : (
        buckets.map((bucket) => (
          <Card
            key={bucket.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
              selectedBucket?.id === bucket.id
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
            }`}
            onClick={() => onSelectBucket(bucket)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {bucket.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                    <Globe className="w-3 h-3 mr-1" />
                    {awsRegions.find((r) => r.value === bucket.region)?.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
