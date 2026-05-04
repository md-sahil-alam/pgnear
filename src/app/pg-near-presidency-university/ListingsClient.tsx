"use client";

import { useEffect, useState } from "react";
import FiltersWrapper from "./FilterWrapper";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ListingsClient() {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    gender: "all",
    amenities: [],
  });

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);

    const params = new URLSearchParams();

    // price
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    // gender
    if (filters.gender && filters.gender !== "all") {
      params.set("gender", filters.gender);
    }

    // amenities (multi-select)
    if (filters.amenities.length > 0) {
      params.set("amenities", filters.amenities.join(","));
    }

    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();

    setListings(data.listings || []);
    setLoading(false);
  };

  // debounce (ONLY ONE useEffect)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchListings();
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters]);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <FiltersWrapper filters={filters} setFilters={setFilters} />

        {/* Listings */}
        <div className="lg:col-span-3">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {listings.map((listing) => (
                <Link
                  key={listing._id}
                  href={`/listing/${listing.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {listing.images?.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No Image
                      </div>
                    )}

                    {listing.isVerified && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold mb-1 line-clamp-1">
                      {listing.title}
                    </h3>

                    <p className="text-blue-600 font-bold text-lg mb-1">
                      ₹{listing.price}
                      <span className="text-sm text-gray-500 font-normal">
                        /month
                      </span>
                    </p>

                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                      {listing.address}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {listing.amenities?.slice(0, 3).map((a: string) => (
                        <span
                          key={a}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {a}
                        </span>
                      ))}
                      {listing.amenities?.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{listing.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{listing.gender}</span>
                      <span>{listing.distanceFromUni}m</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center border">
              <p className="text-gray-500 text-lg mb-2">No listings found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
