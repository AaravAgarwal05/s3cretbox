import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Download } from "lucide-react";
import { S3File } from "./types";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  previewFile: S3File | null;
  onDownload: (file: S3File) => void;
}

export const ImagePreviewDialog = ({
  isOpen,
  onOpenChange,
  previewFile,
  onDownload,
}: ImagePreviewDialogProps) => {
  const handleDownload = () => {
    if (previewFile) {
      onDownload(previewFile);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="flex-1 truncate pr-4">
              {previewFile?.name}
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogHeader>
        {previewFile && (
          <div className="flex justify-center">
            <img
              src={previewFile.url}
              alt={previewFile.name}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
