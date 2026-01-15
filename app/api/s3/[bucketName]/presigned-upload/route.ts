import { NextRequest, NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ bucketName: string }> }
) {
  try {
    const { bucketName } = await params;
    const body = await request.json();
    const { fileName, contentType, prefix, accessKey, secretKey, region } =
      body;

    if (!fileName || !accessKey || !secretKey || !region) {
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

    // Construct the S3 key
    const key = prefix ? `${prefix}${fileName}` : fileName;

    // Create presigned POST URL (works for files up to 5GB)
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: decodedBucketName,
      Key: key,
      Conditions: [
        ["content-length-range", 0, 5 * 1024 * 1024 * 1024], // Up to 5GB
        ["starts-with", "$Content-Type", ""],
      ],
      Fields: {
        "Content-Type": contentType || "application/octet-stream",
      },
      Expires: 3600, // URL valid for 1 hour
    });

    return NextResponse.json({
      url,
      fields,
      key,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
