"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import axios, { CancelTokenSource } from "axios";

export interface UploadingFile {
  id: string;
  file: File;
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "failed" | "cancelled";
  error?: string;
  bucketName: string;
  path: string;
}

interface UploadCredentials {
  accessKey: string;
  secretKey: string;
  region: string;
}

interface UploadManagerContextType {
  uploadingFiles: UploadingFile[];
  isUploading: boolean;
  addFilesToUpload: (
    files: FileList,
    bucketName: string,
    path: string,
    credentials: UploadCredentials
  ) => void;
  cancelUpload: (fileId: string) => void;
  cancelAllUploads: () => void;
  removeCompletedUpload: (fileId: string) => void;
  clearCompletedUploads: () => void;
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
  onUploadComplete?: () => void;
  setOnUploadComplete: (callback: (() => void) | undefined) => void;
}

const UploadManagerContext = createContext<UploadManagerContextType | null>(
  null
);

export const useUploadManager = () => {
  const context = useContext(UploadManagerContext);
  if (!context) {
    throw new Error(
      "useUploadManager must be used within an UploadManagerProvider"
    );
  }
  return context;
};

export const UploadManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [minimized, setMinimized] = useState(false);
  const cancelTokensRef = useRef<Map<string, CancelTokenSource>>(new Map());
  const onUploadCompleteRef = useRef<(() => void) | undefined>(undefined);

  const isUploading = uploadingFiles.some(
    (f) => f.status === "uploading" || f.status === "pending"
  );

  const setOnUploadComplete = useCallback(
    (callback: (() => void) | undefined) => {
      onUploadCompleteRef.current = callback;
    },
    []
  );

  const uploadFile = useCallback(
    async (
      uploadFile: UploadingFile,
      credentials: UploadCredentials
    ): Promise<void> => {
      const cancelSource = axios.CancelToken.source();
      cancelTokensRef.current.set(uploadFile.id, cancelSource);

      // Update status to uploading
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f
        )
      );

      try {
        // Step 1: Get presigned URL from our API (small request, no body size limit issue)
        const presignedResponse = await axios.post(
          `/api/s3/${encodeURIComponent(
            uploadFile.bucketName
          )}/presigned-upload`,
          {
            fileName: uploadFile.file.name,
            contentType: uploadFile.file.type || "application/octet-stream",
            prefix: uploadFile.path ? `${uploadFile.path}/` : "",
            accessKey: credentials.accessKey,
            secretKey: credentials.secretKey,
            region: credentials.region,
          },
          {
            cancelToken: cancelSource.token,
          }
        );

        const { url } = presignedResponse.data;

        // Step 2: Upload directly to S3 using presigned PUT URL
        await axios.put(url, uploadFile.file, {
          headers: {
            "Content-Type": uploadFile.file.type || "application/octet-stream",
          },
          cancelToken: cancelSource.token,
          onUploadProgress: (progressEvent) => {
            const percentage = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id ? { ...f, progress: percentage } : f
              )
            );
          },
        });

        // Mark as completed
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "completed" as const, progress: 100 }
              : f
          )
        );

        // Call the refresh callback if set
        onUploadCompleteRef.current?.();
      } catch (error) {
        if (axios.isCancel(error)) {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, status: "cancelled" as const }
                : f
            )
          );
        } else {
          const errorMessage = axios.isAxiosError(error)
            ? error.response?.data?.error || error.message
            : "Upload failed";
          console.error("Upload error:", error);
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? {
                    ...f,
                    status: "failed" as const,
                    error: errorMessage,
                  }
                : f
            )
          );
        }
      } finally {
        cancelTokensRef.current.delete(uploadFile.id);
      }
    },
    []
  );

  const addFilesToUpload = useCallback(
    (
      files: FileList,
      bucketName: string,
      path: string,
      credentials: UploadCredentials
    ) => {
      const newFiles: UploadingFile[] = Array.from(files).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${
          file.name
        }`,
        file,
        fileName: file.name,
        progress: 0,
        status: "pending" as const,
        bucketName,
        path,
      }));

      setUploadingFiles((prev) => [...prev, ...newFiles]);
      setMinimized(false);

      // Start uploading each file
      newFiles.forEach((newFile) => {
        newFile.status = "pending";
        // Use setTimeout to batch the state updates
        setTimeout(() => {
          // Check if the upload wasn't cancelled before it started
          setUploadingFiles((current) => {
            const file = current.find((f) => f.id === newFile.id);
            if (file && file.status === "pending") {
              // Start the upload using presigned URLs
              uploadFile(newFile, credentials);
            }
            return current;
          });
        }, 100);
      });
    },
    [uploadFile]
  );

  const cancelUpload = useCallback((fileId: string) => {
    const cancelSource = cancelTokensRef.current.get(fileId);
    if (cancelSource) {
      cancelSource.cancel("Upload cancelled by user");
    }
    // Also mark pending uploads as cancelled
    setUploadingFiles((prev) =>
      prev.map((f) =>
        f.id === fileId && f.status === "pending"
          ? { ...f, status: "cancelled" as const }
          : f
      )
    );
  }, []);

  const cancelAllUploads = useCallback(() => {
    cancelTokensRef.current.forEach((cancelSource) => {
      cancelSource.cancel("All uploads cancelled");
    });
    setUploadingFiles((prev) =>
      prev.map((f) =>
        f.status === "uploading" || f.status === "pending"
          ? { ...f, status: "cancelled" as const }
          : f
      )
    );
  }, []);

  const removeCompletedUpload = useCallback((fileId: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  const clearCompletedUploads = useCallback(() => {
    setUploadingFiles((prev) =>
      prev.filter(
        (f) =>
          f.status !== "completed" &&
          f.status !== "failed" &&
          f.status !== "cancelled"
      )
    );
  }, []);

  return (
    <UploadManagerContext.Provider
      value={{
        uploadingFiles,
        isUploading,
        addFilesToUpload,
        cancelUpload,
        cancelAllUploads,
        removeCompletedUpload,
        clearCompletedUploads,
        minimized,
        setMinimized,
        onUploadComplete: onUploadCompleteRef.current,
        setOnUploadComplete,
      }}
    >
      {children}
    </UploadManagerContext.Provider>
  );
};
