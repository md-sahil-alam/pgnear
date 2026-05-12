"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Compact skeleton loader for single listing info sections
 * Used in cards, modals, lists
 */
export function ListingInfoSkeleton() {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Skeleton className="w-32 h-5 rounded-lg" />
        <Skeleton className="w-full h-4 rounded-lg" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="w-24 h-4 rounded-lg" />
        <Skeleton className="w-24 h-4 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Skeleton loader for filter panel
 */
export function FilterPanelSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="w-24 h-5 rounded-lg" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-20 h-4 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for user profile section
 */
export function UserProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32 h-5 rounded-lg" />
          <Skeleton className="w-40 h-4 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for contact info section
 */
export function ContactInfoSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-20 h-4 rounded-lg" />
            <Skeleton className="w-32 h-3 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for amenities list
 */
export function AmenitiesSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-24 h-5 rounded-lg" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-8 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton loader for pricing table
 */
export function PricingTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-20 h-5 rounded-lg" />
      <div className="border rounded-xl overflow-hidden">
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
  );
}

/**
 * Skeleton loader for comment/review
 */
export function ReviewSkeleton() {
  return (
    <div className="space-y-4 p-4 border rounded-2xl">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32 h-4 rounded-lg" />
          <Skeleton className="w-24 h-3 rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-4/5 h-3 rounded-lg" />
      </div>
    </div>
  );
}
