import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";

export default async function DashboardPage() {
  await connectDB();

  const totalListings = await Listing.countDocuments();
  const activeListings = await Listing.countDocuments({ isActive: true });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="flex gap-6">
        <div className="p-4 border rounded-lg">
          <p className="text-gray-500">Total Listings</p>
          <h2 className="text-xl font-bold">{totalListings}</h2>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-gray-500">Active Listings</p>
          <h2 className="text-xl font-bold">{activeListings}</h2>
        </div>
      </div>
    </div>
  );
}
