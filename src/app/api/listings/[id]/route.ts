import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ALLOWED_FIELDS = [
  "owner",
  "ownerName",
  "title",
  "description",
  "price",
  "oneSharingprice",
  "twoSharingprice",
  "threeSharingprice",
  "gender",
  "amenities",
  "images",
  "contactPhone",
  "contactWhatsApp",
  "isVerified",
  "isActive",
  "address",
  "distanceFromUni",
  "nearCollege",
];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const updateData: Record<string, any> = {};

    ALLOWED_FIELDS.forEach((field) => {
      if (field in body) {
        updateData[field] = body[field];
      }
    });

    // Keep main price in sync with sharing prices if needed
    if (
      body.price !== undefined ||
      body.oneSharingprice !== undefined ||
      body.twoSharingprice !== undefined ||
      body.threeSharingprice !== undefined
    ) {
      updateData.price =
        body.price ??
        body.oneSharingprice ??
        body.twoSharingprice ??
        body.threeSharingprice ??
        0;
    }

    // Clean nearCollege so empty items don't get saved
    if (Array.isArray(body.nearCollege)) {
      updateData.nearCollege = body.nearCollege
        .filter(
          (item: any) =>
            item &&
            typeof item.college === "string" &&
            item.college.trim() !== "" &&
            item.distance !== "" &&
            item.distance !== null &&
            item.distance !== undefined,
        )
        .map((item: any) => ({
          college: item.college,
          distance: Number(item.distance) || 0,
        }));
    }

    const listing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 },
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
  { params }: { params: Promise<{ id: string }> },
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