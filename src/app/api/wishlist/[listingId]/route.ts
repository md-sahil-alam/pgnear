import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import User from "@/models/User";
import Listing from "@/models/Listing";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

/**
 * GET /api/wishlist/check/:listingId
 * Check if a specific listing is wishlisted by the user
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ listingId: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", isSaved: false },
        { status: 401 }
      );
    }

    const { listingId } = await params;

    if (!listingId || !Types.ObjectId.isValid(listingId)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID", isSaved: false },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json({
        success: true,
        isSaved: false,
      });
    }

    const isSaved = user.wishlist.some(
      (item: any) => item.listingId.toString() === listingId
    );

    return NextResponse.json({
      success: true,
      isSaved,
    });
  } catch (error) {
    console.error("Wishlist check error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check wishlist", isSaved: false },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wishlist/:listingId
 * Remove a specific listing from wishlist
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ listingId: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { listingId } = await params;

    if (!listingId || !Types.ObjectId.isValid(listingId)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    user.wishlist = user.wishlist.filter(
      (item: any) => item.listingId.toString() !== listingId
    );

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}
