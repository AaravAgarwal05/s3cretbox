import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Download,
  Trash2,
  MoreVertical,
  Calendar,
  HardDrive,
  FolderOpen,
  Loader2,
  Eye,
  Check,
} from "lucide-react";
import { FileIcon } from "./file-icon";
import { S3File } from "./types";

interface FileListViewProps {
  filteredFiles: S3File[];
  onItemClick: (file: S3File) => void;
  onDownloadFile: (file: S3File) => void;
  onDeleteFile: (fileId: string) => void;
  isDeleting?: boolean;
  deletingFileId?: string | null;
  selectedFiles?: Set<string>;
  onToggleSelect?: (fileId: string) => void;
  isSelectionMode?: boolean;
}

export const FileListView = ({
  filteredFiles,
  onItemClick,
  onDownloadFile,
  onDeleteFile,
  isDeleting = false,
  deletingFileId = null,
  selectedFiles = new Set(),
  onToggleSelect,
  isSelectionMode = false,
}: FileListViewProps) => {
  // Function to check if file is an image
  const isImageFile = (fileName: string) => {
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];
    const fileExtension = fileName
      .toLowerCase()
      .substring(fileName.lastIndexOf("."));
    return imageExtensions.includes(fileExtension);
  };

  return (
    <div className="space-y-2">
      {filteredFiles.map((file) => {
        const isSelected = selectedFiles.has(file.id);
        return (
          <Card
            key={file.id}
            className={`border transition-all duration-200 ${
              isSelected
                ? "border-emerald-500 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
            } ${file.isFolder ? "cursor-pointer" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Selection Checkbox */}
                {isSelectionMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect?.(file.id);
                    }}
                    className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                      isSelected
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:border-emerald-500"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                )}
                <div
                  className="flex items-center space-x-4 flex-1 min-w-0"
                  onClick={() => file.isFolder && onItemClick(file)}
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    <FileIcon type={file.type} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-zinc-900 dark:text-zinc-100 truncate ${
                        file.isFolder
                          ? "cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400"
                          : ""
                      }`}
                    >
                      {file.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center">
                        <HardDrive className="w-3 h-3 mr-1" />
                        {file.isFolder ? "Folder" : file.size}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {file.lastModified}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.isFolder ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onItemClick(file)}
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDownloadFile(file)}
                    >
                      {isImageFile(file.name) ? (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => onDeleteFile(file.id)}
                        className="text-red-600"
                        disabled={isDeleting && deletingFileId === file.id}
                      >
                        {isDeleting && deletingFileId === file.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
