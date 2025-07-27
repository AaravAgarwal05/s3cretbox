"use client";

import { Lock } from "lucide-react";
import { BucketDialog } from "./bucket-dialog";
import { BucketList } from "./bucket-list";

interface S3Bucket {
  id: string;
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  dateAdded: string;
}

interface NewBucket {
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
}

interface SidebarContentProps {
  // Bucket Dialog Props
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  newBucket: NewBucket;
  setNewBucket: (bucket: NewBucket) => void;
  onAddBucket: () => void;

  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingBucket: S3Bucket | null;
  setEditingBucket: (bucket: S3Bucket | null) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;

  // Bucket List Props
  buckets: S3Bucket[];
  selectedBucket: S3Bucket | null;
  onSelectBucket: (bucket: S3Bucket) => void;

  // Common Props
  awsRegions: Array<{ value: string; label: string }>;
}

export function SidebarContent({
  isAddDialogOpen,
  setIsAddDialogOpen,
  newBucket,
  setNewBucket,
  onAddBucket,
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingBucket,
  setEditingBucket,
  onSaveEdit,
  onCancelEdit,
  buckets,
  selectedBucket,
  onSelectBucket,
  awsRegions,
}: SidebarContentProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-200 rounded-lg flex items-center justify-center">
            <Lock className="w-4 h-4 text-white dark:text-zinc-900" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            S3cretBox
          </h1>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <BucketDialog
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
            newBucket={newBucket}
            setNewBucket={setNewBucket}
            onAddBucket={onAddBucket}
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            editingBucket={editingBucket}
            setEditingBucket={setEditingBucket}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            awsRegions={awsRegions}
          />
        </div>

        <BucketList
          buckets={buckets}
          selectedBucket={selectedBucket}
          onSelectBucket={onSelectBucket}
          awsRegions={awsRegions}
        />
      </div>
    </div>
  );
}
