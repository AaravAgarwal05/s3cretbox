import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { S3File } from "./types";
import { imageCache } from "../../../lib/cache";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  previewFile: S3File | null;
  onDownload: (file: S3File) => void;
  isDownloading?: boolean;
}

export const ImagePreviewDialog = ({
  isOpen,
  onOpenChange,
  previewFile,
  onDownload,
  isDownloading = false,
}: ImagePreviewDialogProps) => {
  const [cachedImageUrl, setCachedImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  // Cache image when dialog opens
  useEffect(() => {
    if (isOpen && previewFile?.url && previewFile?.key) {
      const cacheKey = previewFile.key;

      // Check if already cached
      const cached = imageCache.get(cacheKey);
      if (cached) {
        setCachedImageUrl(cached);
        return;
      }

      // Cache the image
      setIsLoadingImage(true);
      imageCache.set(cacheKey, previewFile.url).then((url) => {
        setCachedImageUrl(url);
        setIsLoadingImage(false);
      });
    } else {
      setCachedImageUrl(null);
    }
  }, [isOpen, previewFile?.url, previewFile?.key]);

  const handleDownload = () => {
    if (previewFile && !isDownloading) {
      onDownload(previewFile);
    }
  };

  const imageUrl = cachedImageUrl || previewFile?.url;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!w-auto !max-w-[90vw] max-h-[90vh] p-4 overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-center justify-between pr-6 gap-2">
            <DialogTitle className="truncate min-w-0 max-w-[300px]">
              {previewFile?.name}
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
              className="shrink-0"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </DialogHeader>
        {previewFile && (
          <div className="flex items-center justify-center overflow-hidden flex-1 min-h-0">
            {isLoadingImage ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={previewFile.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
