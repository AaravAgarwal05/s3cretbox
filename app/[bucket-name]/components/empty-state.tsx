import { Button } from "../../../components/ui/button";
import { FolderOpen, Plus } from "lucide-react";

interface EmptyStateProps {
  debouncedSearchQuery: string;
  currentPath: string;
  onUploadClick?: () => void;
}

export const EmptyState = ({
  debouncedSearchQuery,
  currentPath,
  onUploadClick,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <FolderOpen className="w-10 h-10 text-zinc-500 dark:text-zinc-400" />
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        {debouncedSearchQuery
          ? "No items found"
          : `No items in this ${currentPath ? "folder" : "bucket"} yet`}
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
        {debouncedSearchQuery
          ? "Try adjusting your search terms"
          : `Upload your first file to get started with this ${
              currentPath ? "folder" : "bucket"
            }`}
      </p>
      {!debouncedSearchQuery && onUploadClick && (
        <Button
          onClick={onUploadClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Your First File
        </Button>
      )}
    </div>
  );
};
