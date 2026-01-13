import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Loader2, Upload, X } from "lucide-react";
import { ChangeEvent, useRef, useState, useEffect } from "react";

interface UploadDialogProps {
  onUpload: (files: FileList) => void;
  isUploading: boolean;
}

export const UploadDialog = ({ onUpload, isUploading }: UploadDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = () => {
    if (selectedFiles) {
      onUpload(selectedFiles);
      // Don't close the dialog or reset files here - let the parent handle it
    }
  };

  // Close dialog and reset when upload is complete (when isUploading changes from true to false)
  const [wasUploading, setWasUploading] = useState(false);

  useEffect(() => {
    if (wasUploading && !isUploading) {
      // Upload finished, reset state and close dialog after a short delay
      setTimeout(() => {
        setSelectedFiles(null);
        setIsOpen(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setWasUploading(false);
      }, 500); // Small delay to let user see the success state
    } else if (isUploading && !wasUploading) {
      setWasUploading(true);
    }
  }, [isUploading, wasUploading]);

  const handleRemoveFile = (index: number) => {
    if (selectedFiles) {
      const dt = new DataTransfer();
      Array.from(selectedFiles).forEach((file, i) => {
        if (i !== index) dt.items.add(file);
      });
      setSelectedFiles(dt.files);
      if (fileInputRef.current) {
        fileInputRef.current.files = dt.files;
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Don't allow closing dialog while uploading
        if (!isUploading) {
          setIsOpen(open);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Files
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          {selectedFiles && selectedFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected files:</p>
              <div className="space-y-1">
                {Array.from(selectedFiles).map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm"
                  >
                    <span className="truncate">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isUploading}
                      className="ml-2 h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            onClick={handleUpload}
            disabled={
              !selectedFiles || selectedFiles.length === 0 || isUploading
            }
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading {selectedFiles?.length} file
                {selectedFiles?.length !== 1 ? "s" : ""}...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload {selectedFiles?.length} file
                {selectedFiles?.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
