import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import ListingsTable from "./ListingsTable";
import Link from "next/link";
import { Building2, CircleCheckBig, CircleOff, Plus } from "lucide-react";

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

  // Stats
  const totalListings = listingsData.length;

  const activeListings = listingsData.filter((item) => item.isActive).length;

  const verifiedListings = listingsData.filter(
    (item) => item.isVerified,
  ).length;

  const inactiveListings = totalListings - activeListings;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">
              Admin Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Listings Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all PG listings from one place
            </p>
          </div>

          {/* Add Listing Button */}
          <Link
            href="/admin/listings/new"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition font-medium">
            <Plus size={18} />
            Add Listing
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Listings</p>

                <h2 className="text-3xl font-bold mt-2">{totalListings}</h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Listings</p>

                <h2 className="text-3xl font-bold mt-2">{activeListings}</h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CircleCheckBig className="text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Verified */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Verified Listings</p>

                <h2 className="text-3xl font-bold mt-2">{verifiedListings}</h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <CircleCheckBig className="text-violet-600" />
              </div>
            </div>
          </div>

          {/* Inactive */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive Listings</p>

                <h2 className="text-3xl font-bold mt-2">{inactiveListings}</h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <CircleOff className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              All Listings
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View, edit and manage all PG listings
            </p>
          </div>

          <div className="p-6">
            <ListingsTable initialListings={listingsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
