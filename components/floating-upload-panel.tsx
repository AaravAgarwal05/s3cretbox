"use client";

import { useUploadManager, UploadingFile } from "../lib/upload-manager";
import { Button } from "./ui/button";
import {
  X,
  Minimize2,
  Maximize2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react";

const UploadItemStatus = ({
  file,
  onCancel,
  onRemove,
}: {
  file: UploadingFile;
  onCancel: () => void;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium truncate pr-2">
            {file.fileName}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {file.status === "uploading" && (
              <>
                <span className="text-xs text-emerald-600 font-medium">
                  {file.progress}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={onCancel}
                  title="Cancel upload"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            {file.status === "pending" && (
              <>
                <span className="text-xs text-zinc-500">Waiting...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={onCancel}
                  title="Cancel upload"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            {file.status === "completed" && (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600"
                  onClick={onRemove}
                  title="Remove from list"
                >
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
            {file.status === "failed" && (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600"
                  onClick={onRemove}
                  title="Remove from list"
                >
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
            {file.status === "cancelled" && (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600"
                  onClick={onRemove}
                  title="Remove from list"
                >
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
        </div>
        {(file.status === "uploading" || file.status === "pending") && (
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                file.status === "uploading"
                  ? "bg-emerald-500"
                  : "bg-zinc-400 dark:bg-zinc-500"
              }`}
              style={{
                width: file.status === "uploading" ? `${file.progress}%` : "0%",
              }}
            />
          </div>
        )}
        {file.status === "failed" && file.error && (
          <p className="text-xs text-red-500 mt-1">{file.error}</p>
        )}
      </div>
    </div>
  );
};

export const FloatingUploadPanel = () => {
  const {
    uploadingFiles,
    isUploading,
    cancelUpload,
    cancelAllUploads,
    removeCompletedUpload,
    clearCompletedUploads,
    minimized,
    setMinimized,
  } = useUploadManager();

  // Don't show if no uploads
  if (uploadingFiles.length === 0) {
    return null;
  }

  const completedCount = uploadingFiles.filter(
    (f: UploadingFile) => f.status === "completed"
  ).length;
  const failedCount = uploadingFiles.filter(
    (f: UploadingFile) => f.status === "failed"
  ).length;
  const cancelledCount = uploadingFiles.filter(
    (f: UploadingFile) => f.status === "cancelled"
  ).length;
  const activeCount = uploadingFiles.filter(
    (f: UploadingFile) => f.status === "uploading" || f.status === "pending"
  ).length;
  const totalProgress =
    uploadingFiles.length > 0
      ? Math.round(
          uploadingFiles.reduce(
            (acc: number, f: UploadingFile) => acc + f.progress,
            0
          ) / uploadingFiles.length
        )
      : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {isUploading ? (
            <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 text-emerald-500" />
          )}
          <span className="font-medium text-sm">
            {isUploading
              ? `Uploading ${activeCount} file${
                  activeCount !== 1 ? "s" : ""
                }...`
              : `${completedCount} completed`}
          </span>
          {isUploading && (
            <span className="text-xs text-zinc-500">({totalProgress}%)</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {isUploading && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={cancelAllUploads}
            >
              Cancel All
            </Button>
          )}
          {!isUploading &&
            (completedCount > 0 || failedCount > 0 || cancelledCount > 0) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={clearCompletedUploads}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setMinimized(!minimized)}
          >
            {minimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Overall Progress Bar (when minimized) */}
      {minimized && isUploading && (
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1">
          <div
            className="bg-emerald-500 h-1 transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      )}

      {/* File List */}
      {!minimized && (
        <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
          {uploadingFiles.map((file: UploadingFile) => (
            <UploadItemStatus
              key={file.id}
              file={file}
              onCancel={() => cancelUpload(file.id)}
              onRemove={() => removeCompletedUpload(file.id)}
            />
          ))}
        </div>
      )}

      {/* Summary Footer */}
      {!minimized && (
        <div className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 flex justify-between">
          <span>
            {completedCount > 0 && (
              <span className="text-emerald-600">
                {completedCount} completed
              </span>
            )}
            {failedCount > 0 && (
              <span className="text-red-500 ml-2">{failedCount} failed</span>
            )}
            {cancelledCount > 0 && (
              <span className="text-yellow-500 ml-2">
                {cancelledCount} cancelled
              </span>
            )}
          </span>
          <span>{uploadingFiles.length} total</span>
        </div>
      )}
    </div>
  );
};
