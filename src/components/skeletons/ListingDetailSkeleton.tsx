"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Skeleton loader for listing detail page
 */
export default function ListingDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link Skeleton */}
        <Skeleton className="w-32 h-6 rounded-lg mb-6" />

        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Image Gallery Skeleton */}
          <div className="w-full h-96 bg-gray-200">
            <Skeleton className="w-full h-full rounded-none" />
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-6">
            {/* Header with Title and Save Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-8 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0 ml-4" />
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-200">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-20 h-4 rounded-lg" />
                  <Skeleton className="w-24 h-6 rounded-lg" />
                </div>
              ))}
            </div>

            {/* Price Table Skeleton */}
            <div className="space-y-3">
              <Skeleton className="w-20 h-6 rounded-lg" />
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 flex gap-4">
                  <Skeleton className="w-24 h-4 rounded-lg" />
                  <Skeleton className="w-32 h-4 rounded-lg" />
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="px-4 py-3 border-t flex gap-4">
                    <Skeleton className="w-32 h-4 rounded-lg" />
                    <Skeleton className="w-20 h-4 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-3">
              <Skeleton className="w-32 h-6 rounded-lg" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-4 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Amenities Skeleton */}
            <div className="space-y-3">
              <Skeleton className="w-28 h-6 rounded-lg" />
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="w-24 h-8 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
