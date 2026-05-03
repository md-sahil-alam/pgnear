import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";

export async function GET() {
  await connectDB();

  const listings = await Listing.find();

  return Response.json({ success: true, listings });
}