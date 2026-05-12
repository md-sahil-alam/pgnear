"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Skeleton loader for a single listing card
 * Matches the structure of listing cards in grids
 */
export default function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition">
      {/* Image Skeleton */}
      <div className="relative h-52 bg-gray-200 overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />

        {/* Verified Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="w-16 h-6 rounded-md" />
        </div>

        {/* Save Button Skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-6 rounded-lg" />
          <Skeleton className="w-1/2 h-4 rounded-lg" />
        </div>

        {/* Price Skeleton */}
        <Skeleton className="w-1/3 h-6 rounded-lg" />

        {/* Address Skeleton */}
        <Skeleton className="w-4/5 h-4 rounded-lg" />

        {/* Meta Info Skeleton */}
        <div className="flex justify-between">
          <Skeleton className="w-20 h-4 rounded-lg" />
          <Skeleton className="w-20 h-4 rounded-lg" />
        </div>

        {/* Amenities Skeleton */}
        <div className="flex gap-2 flex-wrap pt-2">
          <Skeleton className="w-16 h-6 rounded-lg" />
          <Skeleton className="w-20 h-6 rounded-lg" />
          <Skeleton className="w-24 h-6 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
