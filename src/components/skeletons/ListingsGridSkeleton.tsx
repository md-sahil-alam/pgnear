"use client";

import ListingCardSkeleton from "./ListingCardSkeleton";

interface ListingsGridSkeletonProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Skeleton loader for a grid of listing cards
 * Responsive and configurable
 */
export default function ListingsGridSkeleton({
  count = 6,
  columns = 3,
}: ListingsGridSkeletonProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}
