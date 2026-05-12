import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import User from "@/models/User";
import Listing from "@/models/Listing";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

/**
 * GET /api/wishlist
 * Fetch all wishlisted items for the user (requires firebaseUid in query)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return NextResponse.json(
        { success: false, error: "Firebase UID required" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ firebaseUid }).populate(
      "wishlist.listingId"
    );

    if (!user) {
      return NextResponse.json({
        success: true,
        listings: [],
        count: 0,
      });
    }

    // Return populated listing data
    const listings = user.wishlist.map((item: any) => item.listingId);

    // Serialize Mongoose documents to plain objects
    const serializedListings = JSON.parse(JSON.stringify(listings));

    return NextResponse.json({
      success: true,
      listings: serializedListings,
      count: serializedListings.length,
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wishlist
 * Toggle wishlist status for a listing
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { listingId, firebaseUid } = body;

    if (!firebaseUid) {
      return NextResponse.json(
        { success: false, error: "Firebase UID required" },
        { status: 401 }
      );
    }

    if (!listingId || !Types.ObjectId.isValid(listingId)) {
      return NextResponse.json(
        { success: false, error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    // Get or create user
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found. Please login first." },
        { status: 404 }
      );
    }

    // Check if already wishlisted
    const existingIndex = user.wishlist.findIndex(
      (item: any) => item.listingId.toString() === listingId
    );

    if (existingIndex > -1) {
      // Remove from wishlist
      user.wishlist.splice(existingIndex, 1);
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Removed from wishlist",
        isSaved: false,
      });
    } else {
      // Add to wishlist
      user.wishlist.push({
        listingId,
        title: listing.title,
        slug: listing.slug,
        savedAt: new Date(),
      });
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Added to wishlist",
        isSaved: true,
      });
    }
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle wishlist" },
      { status: 500 }
    );
  }
}
