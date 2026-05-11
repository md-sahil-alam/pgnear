import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { firebaseUid, listingId, interactionType } = await request.json();

    if (!firebaseUid || !listingId || !interactionType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["call", "whatsapp"].includes(interactionType)) {
      return NextResponse.json(
        { error: "Invalid interaction type" },
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

    // Add interaction to user's interactions array
    user.interactions.push({
      listingId,
      interactionType,
      timestamp: new Date(),
    });

    await user.save();

    return NextResponse.json(
      {
        message: "Interaction tracked successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Track interaction error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
