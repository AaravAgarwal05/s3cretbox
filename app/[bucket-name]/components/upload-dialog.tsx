import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Upload, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

interface UploadDialogProps {
  onUpload: (files: FileList) => void;
  isUploading?: boolean;
}

export const UploadDialog = ({ onUpload }: UploadDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = () => {
    if (selectedFiles) {
      onUpload(selectedFiles);
      // Close dialog and reset after adding to queue
      setSelectedFiles(null);
      setIsOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const totalSize = selectedFiles
    ? Array.from(selectedFiles).reduce((acc, f) => acc + f.size, 0)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          />
          {selectedFiles && selectedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {selectedFiles.length} file
                  {selectedFiles.length !== 1 ? "s" : ""} selected
                </p>
                <p className="text-xs text-zinc-500">
                  Total: {formatFileSize(totalSize)}
                </p>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto overflow-x-hidden">
                {Array.from(selectedFiles).map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm"
                  >
                    <span className="truncate min-w-0 flex-1 max-w-[200px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2 whitespace-nowrap">
                      {formatFileSize(file.size)}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFile(index)}
                      className="h-6 w-6 p-0 ml-1 shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Files will upload in the background. You can continue browsing while
            uploads complete.
          </div>

          <Button
            onClick={handleUpload}
            disabled={!selectedFiles || selectedFiles.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
          >
            <Upload className="w-4 h-4 mr-2" />
            Add {selectedFiles?.length || 0} file
            {selectedFiles?.length !== 1 ? "s" : ""} to upload queue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
