"use client";

import Link from "next/link";

import SaveButton from "@/components/SaveButton";
import { ShieldCheck } from "lucide-react";
import { formatGender } from "@/lib/gender";

interface Listing {
  _id: string;
  slug: string;
  title: string;
  images?: string[];
  threeSharingprice?: number;
  address?: string;
  gender?: string;
  distanceFromUni?: number;
  isVerified?: boolean;
  amenities?: string[];
}

interface HomeListingsProps {
  listings: Listing[];
}

export default function HomeListings({ listings }: HomeListingsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Link
          key={listing._id}
          href={`/listing/${listing.slug}`}
          className="group block">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition hover:shadow-lg">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              {listing.images?.length ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}

              {/* Verified badge */}
              {listing.isVerified && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-md">
                  Verified
                  <ShieldCheck className="inline-block ml-1" size={18} />
                </span>
              )}

              {/* Save Button */}
              <div className="absolute top-3 right-3">
                <SaveButton listingId={listing._id} size="md" />
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
                {listing.title}
              </h3>

              {/* Price */}
              <p className="text-lg font-bold text-emerald-600 mt-2">
                ₹{listing.threeSharingprice || "—"}
                <span className="text-sm text-gray-500 font-normal">
                  /month
                </span>
              </p>

              {/* Location */}
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {listing.address || "Location not available"}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                <span className="capitalize">
                  {formatGender(listing.gender)}
                </span>

                <span>
                  {listing.distanceFromUni
                    ? `${(listing.distanceFromUni / 1000).toFixed(1)}km`
                    : "—"}
                </span>
              </div>

              {/* Amenities */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div className="flex gap-1 flex-wrap mt-3">
                  {listing.amenities.slice(0, 2).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}

                  {listing.amenities.length > 2 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{listing.amenities.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
