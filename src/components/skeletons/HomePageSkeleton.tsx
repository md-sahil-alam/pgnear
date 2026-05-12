"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Skeleton loader for home page with hero and featured listings
 */
export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] bg-gray-200 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="absolute inset-0 flex items-end justify-center pb-12 px-4 z-10">
          <div className="px-6 py-6 text-center max-w-2xl w-full space-y-4">
            <Skeleton className="w-full h-12 rounded-lg mx-auto max-w-sm" />
            <Skeleton className="w-4/5 h-6 rounded-lg mx-auto" />
            <Skeleton className="w-32 h-10 rounded-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex-1 space-y-2">
            <Skeleton className="w-48 h-8 rounded-lg" />
            <Skeleton className="w-64 h-5 rounded-lg" />
          </div>
          <Skeleton className="w-24 h-6 rounded-lg hidden md:block" />
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
              <div className="relative h-52 bg-gray-200">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute top-3 left-3">
                  <Skeleton className="w-16 h-6 rounded-md" />
                </div>
                <div className="absolute top-3 right-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                </div>
              </div>

              <div className="p-5 space-y-4">
                <Skeleton className="w-3/4 h-6 rounded-lg" />
                <Skeleton className="w-1/3 h-6 rounded-lg" />
                <Skeleton className="w-4/5 h-4 rounded-lg" />

                <div className="flex justify-between">
                  <Skeleton className="w-20 h-4 rounded-lg" />
                  <Skeleton className="w-20 h-4 rounded-lg" />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="w-16 h-6 rounded-lg" />
                  <Skeleton className="w-20 h-6 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Skeleton className="w-40 h-12 rounded-lg mx-auto" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-12 py-12 space-y-8">
        <div className="text-center space-y-4 mb-12">
          <Skeleton className="w-64 h-8 rounded-lg mx-auto" />
          <Skeleton className="w-96 h-6 rounded-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-200 space-y-4">
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-full h-4 rounded-lg" />
              <Skeleton className="w-4/5 h-4 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
