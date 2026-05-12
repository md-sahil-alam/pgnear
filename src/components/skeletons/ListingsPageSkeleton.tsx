"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Skeleton loader for listings page with filters
 */
export default function ListingsPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-4">
        <Skeleton className="w-64 h-8 rounded-lg" />
        <Skeleton className="w-96 h-6 rounded-lg" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-4">
            {/* Filter Title */}
            <Skeleton className="w-24 h-6 rounded-lg" />

            {/* Filter Groups */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-32 h-5 rounded-lg" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="w-24 h-4 rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200">
                    <Skeleton className="w-full h-full rounded-none" />
                    <div className="absolute top-3 left-3">
                      <Skeleton className="w-16 h-6 rounded-md" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <Skeleton className="w-3/4 h-5 rounded-lg" />
                    <Skeleton className="w-1/3 h-6 rounded-lg" />
                    <Skeleton className="w-4/5 h-4 rounded-lg" />

                    <div className="flex justify-between">
                      <Skeleton className="w-20 h-4 rounded-lg" />
                      <Skeleton className="w-20 h-4 rounded-lg" />
                    </div>

                    <div className="flex gap-1 flex-wrap pt-2">
                      <Skeleton className="w-16 h-6 rounded-lg" />
                      <Skeleton className="w-20 h-6 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
