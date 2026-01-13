import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ bucketName: string }> }
) {
  try {
    const { bucketName } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const prefix = (formData.get("prefix") as string) || "";
    const accessKey = formData.get("accessKey") as string;
    const secretKey = formData.get("secretKey") as string;
    const region = formData.get("region") as string;

    if (!file || !accessKey || !secretKey || !region) {
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

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Construct the S3 key
    const key = prefix ? `${prefix}${file.name}` : file.name;

    // Upload the file
    const command = new PutObjectCommand({
      Bucket: decodedBucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    return NextResponse.json({
      success: true,
      key: key,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json(
      { error: "Failed to upload file to S3" },
      { status: 500 }
    );
  }
}
