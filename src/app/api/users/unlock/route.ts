import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { firebaseUid, listingId } = await request.json();

    if (!firebaseUid || !listingId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if listing is already unlocked
    const isAlreadyUnlocked = user.unlockedListings.some(
      (item: any) => item.listingId.toString() === listingId
    );

    if (isAlreadyUnlocked) {
      return NextResponse.json(
        {
          message: "Listing already unlocked",
          unlockedListings: user.unlockedListings,
        },
        { status: 200 }
      );
    }

    // Add listing to unlocked listings
    user.unlockedListings.push({
      listingId,
      unlockedAt: new Date(),
    });

    await user.save();

    return NextResponse.json(
      {
        message: "Listing unlocked successfully",
        unlockedListings: user.unlockedListings,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Unlock listing error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
