import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bucketName: string }> }
) {
  try {
    // bucketName is extracted but not used in this route as it works with presigned URLs
    await params; // Consume the params to avoid unused variable warning
    const searchParams = request.nextUrl.searchParams;
    const fileUrl = searchParams.get("url");
    const fileName = searchParams.get("fileName");

    if (!fileUrl || !fileName) {
      return NextResponse.json(
        { error: "Missing file URL or fileName" },
        { status: 400 }
      );
    }

    // Fetch the file from S3
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch file from S3" },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();

    // Get content type from the original response or set a default
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    // Return the file with proper headers for download
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
