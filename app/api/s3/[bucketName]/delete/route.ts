import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  DeleteObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ bucketName: string }> }
) {
  try {
    const { bucketName } = await params;
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("key");
    const accessKey = searchParams.get("accessKey");
    const secretKey = searchParams.get("secretKey");
    const region = searchParams.get("region");
    const isFolder = searchParams.get("isFolder") === "true";

    if (!fileKey || !accessKey || !secretKey || !region) {
      return NextResponse.json(
        { error: "Missing required parameters" },
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

    if (isFolder) {
      // For folders, we need to delete all objects with this prefix
      const folderPrefix = fileKey.endsWith("/") ? fileKey : `${fileKey}/`;

      let continuationToken: string | undefined;
      let deletedCount = 0;

      do {
        // List all objects with this prefix
        const listCommand = new ListObjectsV2Command({
          Bucket: decodedBucketName,
          Prefix: folderPrefix,
          ContinuationToken: continuationToken,
        });

        const listResponse = await s3Client.send(listCommand);
        const objects = listResponse.Contents || [];

        if (objects.length > 0) {
          // Delete objects in batches (max 1000 per request)
          const deleteCommand = new DeleteObjectsCommand({
            Bucket: decodedBucketName,
            Delete: {
              Objects: objects.map((obj) => ({ Key: obj.Key })),
              Quiet: true,
            },
          });

          await s3Client.send(deleteCommand);
          deletedCount += objects.length;
        }

        continuationToken = listResponse.NextContinuationToken;
      } while (continuationToken);

      // Also delete the folder marker itself (the empty object with trailing slash)
      try {
        const deleteFolderMarker = new DeleteObjectCommand({
          Bucket: decodedBucketName,
          Key: folderPrefix,
        });
        await s3Client.send(deleteFolderMarker);
      } catch {
        // Folder marker might not exist, ignore error
      }

      return NextResponse.json({
        success: true,
        deletedCount,
        message: `Deleted folder and ${deletedCount} object(s)`,
      });
    } else {
      // Delete single file
      const command = new DeleteObjectCommand({
        Bucket: decodedBucketName,
        Key: fileKey,
      });

      await s3Client.send(command);

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Error deleting S3 file:", error);
    return NextResponse.json(
      { error: "Failed to delete file from S3" },
      { status: 500 }
    );
  }
}
