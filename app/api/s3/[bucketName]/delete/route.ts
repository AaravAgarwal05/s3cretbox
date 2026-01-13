import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

    // Delete the object
    const command = new DeleteObjectCommand({
      Bucket: decodedBucketName,
      Key: fileKey,
    });

    await s3Client.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting S3 file:", error);
    return NextResponse.json(
      { error: "Failed to delete file from S3" },
      { status: 500 }
    );
  }
}
