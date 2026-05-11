import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get all users with their interaction counts
    const users = await User.find({})
      .select("name phoneNumber createdAt lastLoginAt")
      .populate("unlockedListings.listingId", "title")
      .populate("interactions.listingId", "title")
      .sort({ createdAt: -1 });

    const usersWithStats = users.map((user: any) => ({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      unlockedListingsCount: user.unlockedListings.length,
      interactionsCount: user.interactions.length,
      calls: user.interactions.filter(
        (i: any) => i.interactionType === "call"
      ).length,
      whatsapps: user.interactions.filter(
        (i: any) => i.interactionType === "whatsapp"
      ).length,
    }));

    // Calculate dashboard stats
    const stats = {
      totalUsers: usersWithStats.length,
      totalInteractions: usersWithStats.reduce(
        (sum: number, u: any) => sum + u.interactionsCount,
        0
      ),
      totalCalls: usersWithStats.reduce(
        (sum: number, u: any) => sum + u.calls,
        0
      ),
      totalWhatsapps: usersWithStats.reduce(
        (sum: number, u: any) => sum + u.whatsapps,
        0
      ),
      avgInteractionsPerUser:
        usersWithStats.length > 0
          ? (
              usersWithStats.reduce(
                (sum: number, u: any) => sum + u.interactionsCount,
                0
              ) / usersWithStats.length
            ).toFixed(2)
          : 0,
    };

    return NextResponse.json(
      {
        stats,
        users: usersWithStats,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
