import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import { S3File } from "./types";

interface BulkDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFiles: S3File[];
  isDeleting: boolean;
  deletionProgress: { current: number; total: number } | null;
  onConfirmDelete: () => void;
}

export const BulkDeleteDialog = ({
  isOpen,
  onOpenChange,
  selectedFiles,
  isDeleting,
  deletionProgress,
  onConfirmDelete,
}: BulkDeleteDialogProps) => {
  const fileCount = selectedFiles.length;
  const folderCount = selectedFiles.filter((f) => f.isFolder).length;
  const regularFileCount = fileCount - folderCount;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Delete {fileCount} Item{fileCount !== 1 ? "s" : ""}
          </DialogTitle>
          <DialogDescription className="text-left space-y-2">
            <p>Are you sure you want to delete the following?</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              {regularFileCount > 0 && (
                <li>
                  {regularFileCount} file{regularFileCount !== 1 ? "s" : ""}
                </li>
              )}
              {folderCount > 0 && (
                <li>
                  {folderCount} folder{folderCount !== 1 ? "s" : ""}
                </li>
              )}
            </ul>
            <p className="text-red-600 font-medium">
              This action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>

        {/* Deletion Progress */}
        {isDeleting && deletionProgress && (
          <div className="space-y-2 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                Deleting item {deletionProgress.current} of{" "}
                {deletionProgress.total}
              </span>
              <span className="font-medium text-red-600">
                {Math.round(
                  (deletionProgress.current / deletionProgress.total) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-red-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${
                    (deletionProgress.current / deletionProgress.total) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              `Delete ${fileCount} Item${fileCount !== 1 ? "s" : ""}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
