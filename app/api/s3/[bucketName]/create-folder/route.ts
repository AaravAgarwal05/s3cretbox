import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ bucketName: string }> }
) {
  try {
    const { bucketName } = await params;
    const body = await request.json();
    const { folderName, prefix, accessKey, secretKey, region } = body;

    if (!folderName || !accessKey || !secretKey || !region) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Validate folder name
    const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
    if (invalidChars.test(folderName)) {
      return NextResponse.json(
        { error: "Folder name contains invalid characters" },
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

    // Construct the S3 key for the folder (folders in S3 are just empty objects ending with /)
    const key = prefix ? `${prefix}${folderName}/` : `${folderName}/`;

    // Create the folder by putting an empty object with trailing slash
    // Use Buffer.alloc(0) with explicit ContentLength to avoid stream warnings
    const command = new PutObjectCommand({
      Bucket: decodedBucketName,
      Key: key,
      Body: Buffer.alloc(0),
      ContentLength: 0,
    });

    await s3Client.send(command);

    return NextResponse.json({
      success: true,
      key: key,
      message: "Folder created successfully",
    });
  } catch (error) {
    console.error("Error creating folder in S3:", error);
    return NextResponse.json(
      { error: "Failed to create folder in S3" },
      { status: 500 }
    );
  }
}
