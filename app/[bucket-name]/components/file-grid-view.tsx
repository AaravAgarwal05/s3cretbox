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
  FolderOpen,
  Loader2,
  Eye,
} from "lucide-react";
import { FileIcon } from "./file-icon";
import { S3File } from "./types";

interface FileGridViewProps {
  filteredFiles: S3File[];
  onItemClick: (file: S3File) => void;
  onDownloadFile: (file: S3File) => void;
  onDeleteFile: (fileId: string) => void;
  isDeleting?: boolean;
  deletingFileId?: string | null;
}

export const FileGridView = ({
  filteredFiles,
  onItemClick,
  onDownloadFile,
  onDeleteFile,
  isDeleting = false,
  deletingFileId = null,
}: FileGridViewProps) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredFiles.map((file) => (
        <Card
          key={file.id}
          className={`border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 hover:shadow-md ${
            file.isFolder ? "cursor-pointer" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                onClick={() => file.isFolder && onItemClick(file)}
              >
                <FileIcon type={file.type} />
              </div>
              <div className="w-full">
                <h3
                  className={`font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm ${
                    file.isFolder
                      ? "cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400"
                      : ""
                  }`}
                  onClick={() => file.isFolder && onItemClick(file)}
                >
                  {file.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {file.isFolder ? "Folder" : file.size}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center justify-center mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  {file.lastModified}
                </p>
              </div>
              <div className="flex space-x-1 w-full">
                {file.isFolder ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => onItemClick(file)}
                  >
                    <FolderOpen className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => onDownloadFile(file)}
                  >
                    {isImageFile(file.name) ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </>
                    )}
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="w-3 h-3" />
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
      ))}
    </div>
  );
};
