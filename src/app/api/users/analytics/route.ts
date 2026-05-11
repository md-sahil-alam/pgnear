import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return NextResponse.json(
        { error: "firebaseUid is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ firebaseUid })
      .populate("unlockedListings.listingId", "title slug")
      .populate("interactions.listingId", "title slug");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate user statistics
    const stats = {
      totalListingsUnlocked: user.unlockedListings.length,
      totalInteractions: user.interactions.length,
      callCount: user.interactions.filter(
        (i: any) => i.interactionType === "call"
      ).length,
      whatsappCount: user.interactions.filter(
        (i: any) => i.interactionType === "whatsapp"
      ).length,
    };

    return NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          firebaseUid: user.firebaseUid,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt,
        },
        stats,
        unlockedListings: user.unlockedListings,
        interactions: user.interactions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get user analytics error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
