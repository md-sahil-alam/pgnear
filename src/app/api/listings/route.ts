import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const listing = await Listing.create({
      ...body,
      price: body.price || body.oneSharingprice || 0,
     slug:
  body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") +
  "-" +
  Date.now(),
    });

    return NextResponse.json({ success: true, listing });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const gender = searchParams.get("gender");
  const amenities = searchParams.get("amenities");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "4");

  const query: any = { isActive: true };

  if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
  if (gender && gender !== "all") query.gender = gender;
  if (amenities) {
    const arr = amenities.split(",");
    query.amenities = { $in: arr };
  }

  const total = await Listing.countDocuments(query);
  const listings = await Listing.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
  const hasMore = (page * limit) < total;

  // Serialize Mongoose documents to plain objects
  const serializedListings = JSON.parse(JSON.stringify(listings));

  return NextResponse.json({ success: true, listings: serializedListings, hasMore });
}