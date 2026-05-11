import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { firebaseUid, phoneNumber, name } = await request.json();

    if (!firebaseUid || !phoneNumber || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Update last login
      user.lastLoginAt = new Date();
      await user.save();
    } else {
      // Create new user
      user = new User({
        firebaseUid,
        phoneNumber,
        name,
        lastLoginAt: new Date(),
      });
      await user.save();
    }

    return NextResponse.json(
      {
        _id: user._id,
        firebaseUid: user.firebaseUid,
        phoneNumber: user.phoneNumber,
        name: user.name,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
