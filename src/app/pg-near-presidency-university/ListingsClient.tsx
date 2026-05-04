"use client";

import { useEffect, useState, useRef } from "react";
import FiltersWrapper from "./FilterWrapper";
import Link from "next/link";

/* ✅ TYPE DEFINITIONS */
type Listing = {
  _id: string;
  title: string;
  slug: string;
  images?: string[];
  isVerified?: boolean;
  price?: number;
  address?: string;
  amenities?: string[];
  gender?: string;
  distanceFromUni?: number;
};

type Filters = {
  minPrice: string;
  maxPrice: string;
  gender: string;
  amenities: string[];
};

/* ✅ COMPONENT */
export default function ListingsClient({
  initialListings = [],
}: {
  initialListings?: Listing[];
}) {
  const [filters, setFilters] = useState<Filters>({
    minPrice: "",
    maxPrice: "",
    gender: "all",
    amenities: [],
  });

  const [listings, setListings] = useState<Listing[]>(initialListings || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  /* ✅ FETCH FUNCTION */
  const fetchListings = async (currentPage: number, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", "10");

    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();

    if (append) {
      setListings((prev) => [...prev, ...data.listings]);
    } else {
      setListings(data.listings);
    }

    setHasMore(data.hasMore);

    if (append) setLoadingMore(false);
    else setLoading(false);
  };

  /* ✅ DEBOUNCE FILTER */
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchListings(1, false);
  }, [filters]);

  /* ✅ INFINITE SCROLL */
  const pageRef = useRef(1);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        pageRef.current += 1;
        fetchListings(pageRef.current, true);
      }
    });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  /* ✅ UI */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filters */}
      <FiltersWrapper filters={filters} setFilters={setFilters} />

      {/* Listings */}
      <div className="lg:col-span-3">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {listings.map((listing: Listing) => (
              <Link
                key={listing._id}
                href={`/listing/${listing.slug}`}
                className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition">
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {listing.images?.length ? (
                    <img
                      src={listing.images[0]}
                      alt={`${listing.title} PG near Presidency University Bangalore`}
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

                  {/* ✅ Safe price handling */}
                  <p className="text-blue-600 font-bold text-lg mb-1">
                    {listing.price
                      ? `₹${listing.price}`
                      : "Price not available"}
                    <span className="text-sm text-gray-500 font-normal">
                      /month
                    </span>
                  </p>

                  {/* ✅ Safe address */}
                  <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                    {listing.address || "Location not available"}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {listing.amenities?.slice(0, 3).map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {a}
                      </span>
                    ))}

                    {listing.amenities && listing.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{listing.amenities.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">
                      {listing.gender || "Any"}
                    </span>
                    <span>
                      {listing.distanceFromUni
                        ? `${listing.distanceFromUni}m`
                        : "--"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center border">
            <p className="text-gray-500 text-lg mb-2">No listings found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        {hasMore && <div ref={sentinelRef} className="h-10" />}

        {loadingMore && (
          <p className="text-gray-500 text-center">Loading more listings...</p>
        )}
      </div>
    </div>
  );
}
