// S3 Bucket interface (matching the one from dashboard)
export interface S3Bucket {
  id: string;
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  dateAdded: string;
}

// S3 file data structure
export interface S3File {
  id: string;
  name: string;
  size: string;
  lastModified: string;
  type:
    | "image"
    | "document"
    | "archive"
    | "audio"
    | "video"
    | "folder"
    | "other";
  url?: string;
  path: string; // Full path including folder structure
  key?: string; // S3 object key
  isFolder: boolean;
}
