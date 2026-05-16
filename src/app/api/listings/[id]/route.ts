import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ALLOWED_FIELDS = [
  "title",
  "price",
  "gender",
  "amenities",
  "images",
  "contactPhone",
  "contactWhatsApp",
  "isVerified",
  "isActive",
  "address",
  "distanceFromUni",
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Filter allowed fields
    const updateData: any = {};
    ALLOWED_FIELDS.forEach((field) => {
      if (field in body) {
        updateData[field] = body[field];
      }
    });

    const listing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, listing });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Listing.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}