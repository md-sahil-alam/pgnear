import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import ListingsTable from "./ListingsTable";

export default async function ListingsPage() {
  await connectDB();

  const listings = await Listing.find().sort({ createdAt: -1 });

  const listingsData = listings.map((item: any) => ({
    _id: item._id.toString(),
    title: item.title,
    price: item.price,
    gender: item.gender,
    isActive: item.isActive,
    isVerified: item.isVerified,
  }));

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">All Listings</h1>

      <ListingsTable initialListings={listingsData} />
    </div>
  );
}
