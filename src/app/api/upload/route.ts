import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const uploadFormData = new FormData();
    uploadFormData.append("file", new Blob([buffer], { type: file.type }));
    uploadFormData.append("upload_preset", "pg_upload");
    uploadFormData.append("folder", "pg-listings");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dd1rxc66q/image/upload",
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary error response:", data);
      throw new Error(`Cloudinary error: ${data.error?.message || response.statusText}`);
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );
  }
}
