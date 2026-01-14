"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input";
import { TopRightControls } from "../../components/top-right-controls";
import { Search, FolderOpen } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import {
  FileGridView,
  FileListView,
  LoadingSpinner,
  EmptyState,
  BreadcrumbNavigation,
  Notification,
  DeleteConfirmationDialog,
  UploadDialog,
  ViewModeControls,
  ImagePreviewDialog,
  S3File,
  S3Bucket,
} from "./components";
import {
  demoBucket,
  getDemoFilesForPath,
  searchDemoFiles,
} from "../../lib/demo-data";

export default function BucketFileManager() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bucketName = params["bucket-name"] as string;
  const currentPath = searchParams.get("path") || "";
  const isDemo = bucketName === "demo-bucket";

  // All state hooks must be called before any conditional returns
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [allFiles, setAllFiles] = useState<S3File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bucketExists, setBucketExists] = useState(false);
  const [bucketCredentials, setBucketCredentials] = useState<S3Bucket | null>(
    null
  );
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  // New state for notifications and loading
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<S3File | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    title: string;
    message: string;
  } | null>(null);

  // State for image preview
  const [imagePreview, setImagePreview] = useState<{
    isOpen: boolean;
    file: S3File | null;
  }>({ isOpen: false, file: null });

  // Function to show notifications
  const showNotification = (
    type: "success" | "error" | "warning",
    title: string,
    message: string
  ) => {
    setNotification({ type, title, message });
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

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

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Clear search query when navigating (when currentPath changes)
  useEffect(() => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
  }, [currentPath]);

  // Check if bucket exists in localStorage
  useEffect(() => {
    setIsLoading(true);
    setBucketExists(false);

    const checkBucketExists = () => {
      // Handle demo bucket
      if (isDemo) {
        setBucketExists(true);
        setBucketCredentials(demoBucket);
        setIsLoading(false);
        return;
      }

      try {
        const savedBuckets = localStorage.getItem("s3cretbox-buckets");
        if (savedBuckets) {
          const parsedBuckets: S3Bucket[] = JSON.parse(savedBuckets);
          const bucket = parsedBuckets.find(
            (bucket) => bucket.name === decodeURIComponent(bucketName)
          );

          if (bucket) {
            setBucketExists(true);
            setBucketCredentials(bucket);
            setIsLoading(false);
          } else {
            // Bucket not found, redirect to 404
            console.log("Bucket not found:", bucketName);
            setBucketExists(false);
            setIsLoading(false);
          }
        } else {
          // No buckets in localStorage, redirect to 404
          console.log("No buckets found in storage");
          setBucketExists(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking bucket existence:", error);
        // On error, redirect to 404
        setBucketExists(false);
        setIsLoading(false);
      }
    };

    // Add a small delay to prevent hydration issues
    const timeoutId = setTimeout(checkBucketExists, 100);

    return () => clearTimeout(timeoutId);
  }, [bucketName, isDemo]);

  // Utility function to refresh files
  const refreshFiles = async () => {
    if (!bucketCredentials) return;

    // Handle demo bucket
    if (isDemo) {
      const demoFiles = getDemoFilesForPath(currentPath);
      setAllFiles(demoFiles);
      return;
    }

    try {
      const params = {
        prefix: currentPath,
        accessKey: bucketCredentials.accessKey,
        secretKey: bucketCredentials.secretKey,
        region: bucketCredentials.region,
      };

      const response = await axios.get(
        `/api/s3/${encodeURIComponent(bucketCredentials.name)}/files`,
        { params }
      );

      setAllFiles(response.data.items || []);
    } catch (error) {
      console.error("Error refreshing files:", error);
    }
  };

  // Fetch files from S3 API
  useEffect(() => {
    const fetchFiles = async () => {
      if (!bucketCredentials) return;

      setIsLoadingFiles(true);

      // Handle demo bucket
      if (isDemo) {
        const demoFiles = getDemoFilesForPath(currentPath);
        setAllFiles(demoFiles);
        setIsLoadingFiles(false);
        return;
      }

      try {
        const params = {
          prefix: currentPath,
          accessKey: bucketCredentials.accessKey,
          secretKey: bucketCredentials.secretKey,
          region: bucketCredentials.region,
        };

        const response = await axios.get(
          `/api/s3/${encodeURIComponent(bucketCredentials.name)}/files`,
          { params }
        );

        setAllFiles(response.data.items || []);
      } catch (error) {
        console.error("Error fetching files:", error);
        setAllFiles([]);
      } finally {
        setIsLoadingFiles(false);
      }
    };

    fetchFiles();
  }, [bucketCredentials, currentPath, isDemo]);

  // Show loading state while checking bucket existence
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <LoadingSpinner message="Loading bucket..." />
      </div>
    );
  }

  // If bucket doesn't exist, show 404
  if (!bucketExists) {
    notFound();
    return null;
  }

  // Get files for current path - now files are already filtered by path from API
  const currentFiles = allFiles;

  // Filter files based on search query (including demo search)
  const normalizedPath = currentPath
    ? currentPath.endsWith("/")
      ? currentPath
      : currentPath + "/"
    : "";
  const filteredFiles =
    debouncedSearchQuery && isDemo
      ? searchDemoFiles(debouncedSearchQuery).filter(
          (file) => file.path === normalizedPath
        )
      : currentFiles.filter((file) =>
          file.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );

  // Generate breadcrumb from current path
  const pathSegments = currentPath ? currentPath.split("/") : [];

  const navigateToFolder = (folderName: string) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    router.push(
      `/${encodeURIComponent(bucketName)}?path=${encodeURIComponent(newPath)}`
    );
  };

  const navigateToPath = (targetPath: string) => {
    if (targetPath === "") {
      router.push(`/${encodeURIComponent(bucketName)}`);
    } else {
      router.push(
        `/${encodeURIComponent(bucketName)}?path=${encodeURIComponent(
          targetPath
        )}`
      );
    }
  };

  const handleFileUpload = async (files: FileList) => {
    if (!bucketCredentials || files.length === 0) return;

    // Block upload in demo mode
    if (isDemo) {
      showNotification(
        "warning",
        "Demo Mode",
        "File upload is disabled in demo mode. Add your own S3 bucket to enable uploads."
      );
      return;
    }

    setIsUploading(true);

    try {
      let uploadedCount = 0;

      // Upload each file
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("prefix", currentPath ? `${currentPath}/` : "");
        formData.append("accessKey", bucketCredentials.accessKey);
        formData.append("secretKey", bucketCredentials.secretKey);
        formData.append("region", bucketCredentials.region);

        await axios.post(
          `/api/s3/${encodeURIComponent(bucketCredentials.name)}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadedCount++;
      }

      showNotification(
        "success",
        "Upload Complete",
        `Successfully uploaded ${uploadedCount} file${
          uploadedCount !== 1 ? "s" : ""
        }`
      );
      await refreshFiles();
    } catch (error) {
      console.error("Upload error:", error);
      showNotification(
        "error",
        "Upload Failed",
        "Failed to upload files. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };
  const handleDeleteFile = (fileId: string) => {
    const file = allFiles.find((f) => f.id === fileId);
    if (!file) return;

    setFileToDelete(file);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteFile = async () => {
    if (!bucketCredentials || !fileToDelete || !fileToDelete.key) return;

    // Block delete in demo mode
    if (isDemo) {
      showNotification(
        "warning",
        "Demo Mode",
        "File deletion is disabled in demo mode. Add your own S3 bucket to enable deletions."
      );
      setShowDeleteConfirm(false);
      setFileToDelete(null);
      return;
    }

    setIsDeleting(true);
    setDeletingFileId(fileToDelete.id);

    try {
      const params = {
        key: fileToDelete.key,
        accessKey: bucketCredentials.accessKey,
        secretKey: bucketCredentials.secretKey,
        region: bucketCredentials.region,
      };

      await axios.delete(
        `/api/s3/${encodeURIComponent(bucketCredentials.name)}/delete`,
        { params }
      );

      // Refresh the file list
      await refreshFiles();

      showNotification(
        "success",
        "File Deleted",
        `Successfully deleted "${fileToDelete.name}"`
      );
    } catch (error) {
      console.error("Error deleting file:", error);
      showNotification(
        "error",
        "Delete Failed",
        `There was an error deleting "${fileToDelete.name}". Please try again.`
      );
    } finally {
      setIsDeleting(false);
      setDeletingFileId(null);
      setShowDeleteConfirm(false);
      setFileToDelete(null);
    }
  };

  const handleDownloadFile = async (file: S3File) => {
    // Demo mode: show notification for downloads
    if (isDemo) {
      if (isImageFile(file.name) && file.url) {
        // Allow image preview in demo mode
        setImagePreview({ isOpen: true, file });
      } else {
        showNotification(
          "warning",
          "Demo Mode",
          "File download is disabled in demo mode. Add your own S3 bucket to enable downloads."
        );
      }
      return;
    }

    if (file.url && bucketCredentials) {
      // Check if it's an image file
      if (isImageFile(file.name)) {
        // Open image preview instead of downloading
        setImagePreview({ isOpen: true, file });
      } else {
        try {
          // Use our API endpoint to download the file and avoid CORS issues
          const downloadUrl = `/api/s3/${encodeURIComponent(
            bucketCredentials.name
          )}/download?url=${encodeURIComponent(
            file.url
          )}&fileName=${encodeURIComponent(file.name)}`;

          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error downloading file:", error);
          showNotification(
            "error",
            "Download Failed",
            "There was an error downloading the file. Please try again."
          );
        }
      }
    }
  };

  const handleActualDownload = async (file: S3File) => {
    if (file.url && bucketCredentials) {
      try {
        // Use our API endpoint to download the file and avoid CORS issues
        const downloadUrl = `/api/s3/${encodeURIComponent(
          bucketCredentials.name
        )}/download?url=${encodeURIComponent(
          file.url
        )}&fileName=${encodeURIComponent(file.name)}`;

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
        showNotification(
          "error",
          "Download Failed",
          "There was an error downloading the file. Please try again."
        );
      }
    }
  };

  const handleItemClick = (file: S3File) => {
    if (file.isFolder) {
      navigateToFolder(file.name);
    } else {
      // Handle file click (download the file)
      handleDownloadFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Fixed Top Right Controls */}
      <TopRightControls />

      {/* Notification */}
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb and Header */}
          <div className="mb-8">
            <BreadcrumbNavigation
              bucketName={bucketName}
              pathSegments={pathSegments}
              onNavigate={navigateToPath}
            />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center">
                  <FolderOpen className="w-8 h-8 mr-3" />
                  {currentPath
                    ? pathSegments[pathSegments.length - 1]
                    : decodeURIComponent(bucketName)}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {filteredFiles.length} item
                  {filteredFiles.length !== 1 ? "s" : ""} in this{" "}
                  {currentPath ? "folder" : "bucket"}
                </p>
              </div>

              {/* Delete Confirmation Dialog */}
              <DeleteConfirmationDialog
                isOpen={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                fileToDelete={fileToDelete}
                isDeleting={isDeleting}
                onConfirmDelete={confirmDeleteFile}
              />

              <UploadDialog
                onUpload={handleFileUpload}
                isUploading={isUploading}
              />
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <ViewModeControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Files Display */}
          {isLoadingFiles ? (
            <LoadingSpinner message="Loading files..." />
          ) : filteredFiles.length === 0 ? (
            <EmptyState
              debouncedSearchQuery={debouncedSearchQuery}
              currentPath={currentPath}
            />
          ) : (
            <>
              {viewMode === "grid" ? (
                <FileGridView
                  filteredFiles={filteredFiles}
                  onItemClick={handleItemClick}
                  onDownloadFile={handleDownloadFile}
                  onDeleteFile={handleDeleteFile}
                  isDeleting={isDeleting}
                  deletingFileId={deletingFileId}
                />
              ) : (
                <FileListView
                  filteredFiles={filteredFiles}
                  onItemClick={handleItemClick}
                  onDownloadFile={handleDownloadFile}
                  onDeleteFile={handleDeleteFile}
                  isDeleting={isDeleting}
                  deletingFileId={deletingFileId}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Preview Dialog */}
      <ImagePreviewDialog
        isOpen={imagePreview.isOpen}
        onOpenChange={(open) => setImagePreview({ isOpen: open, file: null })}
        previewFile={imagePreview.file}
        onDownload={handleActualDownload}
      />
    </div>
  );
}
