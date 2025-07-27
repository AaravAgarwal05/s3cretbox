import {
  File,
  Image,
  FileText,
  Archive,
  Music,
  Video,
  Folder,
} from "lucide-react";

interface FileIconProps {
  type: string;
  className?: string;
}

export const FileIcon = ({ type, className = "w-8 h-8" }: FileIconProps) => {
  switch (type) {
    case "folder":
      return (
        <Folder
          className={`${className} text-yellow-600 dark:text-yellow-400`}
        />
      );
    case "image":
      return (
        <Image className={`${className} text-green-600 dark:text-green-400`} />
      );
    case "document":
      return (
        <FileText className={`${className} text-blue-600 dark:text-blue-400`} />
      );
    case "archive":
      return (
        <Archive
          className={`${className} text-purple-600 dark:text-purple-400`}
        />
      );
    case "audio":
      return (
        <Music className={`${className} text-pink-600 dark:text-pink-400`} />
      );
    case "video":
      return (
        <Video className={`${className} text-red-600 dark:text-red-400`} />
      );
    default:
      return (
        <File className={`${className} text-zinc-600 dark:text-zinc-400`} />
      );
  }
};
