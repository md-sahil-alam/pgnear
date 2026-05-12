"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Skeleton loader for wishlist page
 */
export default function WishlistPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-10 space-y-4">
          <Skeleton className="w-32 h-6 rounded-lg" />

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
              <Skeleton className="w-48 h-8 rounded-lg" />
            </div>
          </div>

          <Skeleton className="w-64 h-6 rounded-lg" />
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              {/* Image */}
              <div className="relative h-52 bg-gray-200">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute top-3 left-3">
                  <Skeleton className="w-16 h-6 rounded-md" />
                </div>
                <div className="absolute top-3 right-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="w-3/4 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-4 rounded-lg" />
                </div>

                <Skeleton className="w-1/3 h-6 rounded-lg" />
                <Skeleton className="w-4/5 h-4 rounded-lg" />

                <div className="flex justify-between">
                  <Skeleton className="w-20 h-4 rounded-lg" />
                  <Skeleton className="w-20 h-4 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
