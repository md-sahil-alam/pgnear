"use client";

import { useEffect, useState, useRef } from "react";
import FiltersWrapper from "./FilterWrapper";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ListingsGridSkeleton } from "@/components/skeletons";
import { formatGender } from "@/lib/gender";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { optimizeImage } from "@/lib/cloudinary";

type Listing = {
  _id: string;
  title: string;
  slug: string;
  images?: string[];
  isVerified?: boolean;
  twoSharingprice?: number;
  threeSharingprice?: number;
  address?: string;
  amenities?: string[];
  gender?: string;
  distanceFromUni?: number;
};

type Filters = {
  minPrice: number;
  maxPrice: number;
  gender: string;
  amenities: string[];
};

/*  COMPONENT */
export default function ListingsClient({
  initialListings = [],
  college,
  gender,
}: {
  initialListings?: Listing[];
  college?: string;
  gender?: string;
}) {
  const [filters, setFilters] = useState<Filters>({
    minPrice: 0,
    maxPrice: 50000,
    gender: "all",
    amenities: [],
  });

  const [listings, setListings] = useState<Listing[]>(initialListings || []);
  // const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const sentinelRef = useRef<HTMLDivElement>(null);

  /* FETCH FUNCTION */
  const fetchListings = async (currentPage: number, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", "10");
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }
    if (college) {
      params.set("college", college);
    }
    if (gender) {
      params.set("gender", gender);
    }
    if (filters.minPrice > 0)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 50000)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.gender !== "all") params.set("gender", filters.gender);
    if (filters.amenities.length > 0)
      params.set("amenities", filters.amenities.join(","));

    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();
    console.log("API DATA", data);

    if (append) {
      setListings((prev) => [...prev, ...data.listings]);
    } else {
      setListings(data.listings);
    }

    setHasMore(data.hasMore);

    if (append) setLoadingMore(false);
    else setLoading(false);
  };

  /* DEBOUNCE FILTER */

  const pageRef = useRef(1);
  const firstLoad = useRef(true);

  /* DEBOUNCE FILTER */
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    pageRef.current = 1;
    setHasMore(true);

    fetchListings(1, false);
  }, [filters, debouncedSearch]);

  /* INFINITE SCROLL */
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          pageRef.current += 1;
          fetchListings(pageRef.current, true);
        }
      },
      {
        rootMargin: "500px",
      },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  /* UI */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
      {/* Filters */}

      <FiltersWrapper filters={filters} setFilters={setFilters} />

      {/* Listings */}
      <div className="lg:col-span-3">
        <div className="lg:col-span-3 mb-6">
          <SearchBar
            search={search}
            onSearchChange={setSearch}
            total={listings.length}
          />
        </div>

        {loading ? (
          <ListingsGridSkeleton count={6} columns={2} />
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
                    <Image
                      src={optimizeImage(listing.images[0])}
                      alt={`${listing.title} PG`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {listing.isVerified && (
                    <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                      Verified{" "}
                      <ShieldCheck size={18} className="inline-block ml-1" />
                    </span>
                  )}

                  {/* Save Button */}
                  {/* <div className="absolute top-2 right-2">
                    <SaveButton listingId={listing._id} size="md" />
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-1 line-clamp-1">
                    {listing.title}
                  </h3>

                  {/* ✅ Safe price handling */}
                  <p className="text-emerald-600 font-bold text-lg mb-1">
                    ₹
                    {listing.threeSharingprice ||
                      listing.twoSharingprice ||
                      "—"}
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
                        className="text-xs bg-blue-100 text-blue-500 px-2 py-1 rounded">
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
                    <span
                      className={`capitalize font-medium px-2 py-1 rounded-full text-xs ${
                        listing.gender === "girls" ||
                        listing.gender === "female"
                          ? "bg-pink-100 text-pink-700"
                          : listing.gender === "boys" ||
                              listing.gender === "male"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700"
                      }`}>
                      {formatGender(listing.gender)}
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
          <ListingsGridSkeleton count={8} columns={2}></ListingsGridSkeleton>
        )}
      </div>
    </div>
  );
}
