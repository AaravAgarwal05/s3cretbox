import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bucketName: string }> }
) {
  try {
    const { bucketName } = await params;
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix") || "";
    const accessKey = searchParams.get("accessKey");
    const secretKey = searchParams.get("secretKey");
    const region = searchParams.get("region");

    if (!accessKey || !secretKey || !region) {
      return NextResponse.json(
        { error: "Missing S3 credentials" },
        { status: 400 }
      );
    }

    const decodedBucketName = decodeURIComponent(bucketName);

    // Create S3 client with provided credentials
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    // List objects in the bucket with proper prefix and delimiter
    const command = new ListObjectsV2Command({
      Bucket: decodedBucketName,
      Prefix: prefix ? `${prefix}/` : "",
      Delimiter: "/", // This helps separate folders from files
    });

    const response = await s3Client.send(command);

    // Process folders (CommonPrefixes) - these are the immediate subdirectories
    const folders =
      response.CommonPrefixes?.map((prefixObj) => {
        const folderPath = prefixObj.Prefix || "";
        // Extract just the folder name (last segment before the trailing slash)
        const folderName = folderPath.split("/").slice(-2, -1)[0] || "";

        return {
          id: `folder-${folderPath}`,
          name: folderName,
          size: "Folder",
          lastModified: new Date().toISOString().split("T")[0], // We don't have folder modification date
          type: "folder" as const,
          path: prefix,
          isFolder: true,
          key: folderPath, // Include the key for folder deletion
        };
      }) || [];

    // Process files (Contents) - only files in the current directory level
    const files = await Promise.all(
      (response.Contents || [])
        .filter((obj) => {
          // Skip if it's the prefix itself (folder marker)
          if (obj.Key === prefix || obj.Key === `${prefix}/`) return false;

          // Only include files that are direct children of the current prefix
          const relativePath =
            obj.Key?.replace(prefix ? `${prefix}/` : "", "") || "";

          // Skip if it contains additional slashes (it's in a subdirectory)
          if (relativePath.includes("/")) return false;

          // Skip empty or folder-like names
          if (!relativePath || relativePath.endsWith("/")) return false;

          return true;
        })
        .map(async (obj) => {
          const fileName =
            obj.Key?.replace(prefix ? `${prefix}/` : "", "") || "";

          // Generate presigned URL for download
          const getObjectCommand = new GetObjectCommand({
            Bucket: decodedBucketName,
            Key: obj.Key,
          });

          const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, {
            expiresIn: 3600, // 1 hour
          });

          // Determine file type based on extension
          const getFileType = (filename: string) => {
            const ext = filename.toLowerCase().split(".").pop();
            if (!ext) return "other";

            const imageExts = [
              "jpg",
              "jpeg",
              "png",
              "gif",
              "bmp",
              "svg",
              "webp",
            ];
            const documentExts = ["pdf", "doc", "docx", "txt", "rtf", "odt"];
            const archiveExts = ["zip", "rar", "7z", "tar", "gz"];
            const audioExts = ["mp3", "wav", "flac", "aac", "ogg"];
            const videoExts = ["mp4", "avi", "mkv", "mov", "wmv", "flv"];

            if (imageExts.includes(ext)) return "image";
            if (documentExts.includes(ext)) return "document";
            if (archiveExts.includes(ext)) return "archive";
            if (audioExts.includes(ext)) return "audio";
            if (videoExts.includes(ext)) return "video";
            return "other";
          };

          return {
            id: obj.Key || "",
            name: fileName,
            size: obj.Size
              ? `${(obj.Size / 1024 / 1024).toFixed(2)} MB`
              : "0 MB",
            lastModified: obj.LastModified?.toISOString().split("T")[0] || "",
            type: getFileType(fileName),
            path: prefix,
            url: presignedUrl,
            key: obj.Key,
            isFolder: false,
          };
        })
    );

    // Filter out null values and combine folders and files
    const validFiles = files.filter((file) => file !== null);
    const allItems = [...folders, ...validFiles];

    return NextResponse.json({
      items: allItems,
      totalCount: allItems.length,
      prefix: prefix, // Include the current prefix for debugging
    });
  } catch (error) {
    console.error("Error fetching S3 files:", error);

    // Handle specific AWS errors
    if (error instanceof Error) {
      if (error.message.includes("NoSuchBucket")) {
        return NextResponse.json(
          { error: "Bucket not found" },
          { status: 404 }
        );
      }
      if (error.message.includes("AccessDenied")) {
        return NextResponse.json(
          { error: "Access denied. Check your credentials." },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch files from S3" },
      { status: 500 }
    );
  }
}
