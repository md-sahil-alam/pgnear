# Loading Skeletons Documentation

Beautiful, modern loading skeleton components for your PG listing platform. All skeletons match your UI structure and follow Apple/SaaS design aesthetics.

## 📦 What's Included

### Main Page Skeletons
- **HomePageSkeleton** - Full home page with hero and featured listings
- **ListingsPageSkeleton** - PG listings page with filters and grid
- **ListingDetailSkeleton** - Individual listing detail page
- **WishlistPageSkeleton** - User wishlist page

### Component Skeletons
- **ListingCardSkeleton** - Single listing card
- **ListingsGridSkeleton** - Responsive grid of listing cards (configurable count & columns)

### Mini/Section Skeletons (from MiniSkeletons.tsx)
- **ListingInfoSkeleton** - Quick listing info display
- **FilterPanelSkeleton** - Filter panel with checkboxes
- **UserProfileSkeleton** - User profile section
- **ContactInfoSkeleton** - Contact information
- **AmenitiesSkeleton** - Amenities list
- **PricingTableSkeleton** - Price comparison table
- **ReviewSkeleton** - Review/comment skeleton

## 🎨 Features

✅ Responsive design (mobile, tablet, desktop)
✅ Smooth animate-pulse effect built-in
✅ Modern rounded-2xl cards
✅ Soft spacing and padding
✅ Apple/SaaS style aesthetics
✅ Tailwind CSS compatible
✅ Zero additional dependencies
✅ App Router compatible (use with Suspense)
✅ TypeScript support

## 📁 File Structure

```
src/
└── components/
    ├── ui/
    │   └── Skeleton.tsx          # Base Skeleton component
    └── skeletons/
        ├── index.ts              # Export barrel file
        ├── ListingCardSkeleton.tsx
        ├── ListingsGridSkeleton.tsx
        ├── ListingDetailSkeleton.tsx
        ├── WishlistPageSkeleton.tsx
        ├── ListingsPageSkeleton.tsx
        ├── HomePageSkeleton.tsx
        └── MiniSkeletons.tsx      # Utility skeletons
```

## 🚀 Usage Examples

### Basic Usage

```typescript
import { ListingCardSkeleton, ListingsGridSkeleton } from "@/components/skeletons";

// Single card skeleton
export function LoadingCard() {
  return <ListingCardSkeleton />;
}

// Grid of skeletons (6 cards, 3 columns)
export function LoadingGrid() {
  return <ListingsGridSkeleton count={6} columns={3} />;
}
```

### With Suspense (Recommended)

```typescript
import { Suspense } from "react";
import { HomePageSkeleton } from "@/components/skeletons";
import HomeListings from "@/components/HomeListings";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HomePageSkeleton />}>
        <HomeListings />
      </Suspense>
    </>
  );
}
```

### Client Component Loading States

```typescript
"use client";
import { useState, useEffect } from "react";
import { ListingsGridSkeleton } from "@/components/skeletons";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/listings")
      .then(r => r.json())
      .then(data => {
        setListings(data.listings);
        setLoading(false);
      });
  }, []);

  return loading ? 
    <ListingsGridSkeleton count={8} columns={3} /> 
    : <YourListingsComponent listings={listings} />;
}
```

### Responsive Grid Skeleton

```typescript
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<ListingsGridSkeleton count={9} columns={3} />

// Options: 1 | 2 | 3 | 4
<ListingsGridSkeleton count={12} columns={4} />
```

### Mini Skeletons for Sections

```typescript
import { 
  FilterPanelSkeleton,
  AmenitiesSkeleton,
  PricingTableSkeleton 
} from "@/components/skeletons";

export function FilterLoading() {
  return <FilterPanelSkeleton />;
}

export function AmenitiesLoading() {
  return <AmenitiesSkeleton />;
}

export function PricingLoading() {
  return <PricingTableSkeleton />;
}
```

## 🎯 Implementation in Your App

### Already Integrated:

1. **ListingsClient.tsx** - Shows grid skeleton while loading listings
2. **wishlist/page.tsx** - Shows page skeleton during auth check and loading
3. **page.tsx (home)** - Suspense boundary with HomePageSkeleton fallback
4. **listing/[slug]/page.tsx** - Ready for Suspense integration

### How to Integrate More:

1. Import the skeleton from `@/components/skeletons`:
```typescript
import { YourSkeleton } from "@/components/skeletons";
```

2. Use in loading states:
```typescript
if (loading) return <YourSkeleton />;
```

Or with Suspense:
```typescript
<Suspense fallback={<YourSkeleton />}>
  <YourAsyncComponent />
</Suspense>
```

## 🎨 Customization

### Modify Colors

Edit `src/components/ui/Skeleton.tsx`:
```typescript
// Default gray background
className={cn("animate-pulse rounded-lg bg-gray-200", className)}

// Change to blue
className={cn("animate-pulse rounded-lg bg-blue-100", className)}
```

### Adjust Animation Speed

Add to `global.css`:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Slower pulse (2s instead of 2s default) */
.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Custom Skeleton Component

```typescript
import { Skeleton } from "@/components/ui/Skeleton";

export function CustomSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="w-full h-12 rounded-2xl" />
      <Skeleton className="w-3/4 h-4 rounded-lg" />
    </div>
  );
}
```

## 💡 Best Practices

1. **Match Real UI** - Skeleton structure should match actual component structure
2. **Responsive** - Use responsive classes (sm:, md:, lg:)
3. **Spacing** - Keep same spacing as real component
4. **Duration** - Use consistent animation speed across all skeletons
5. **Rounded Corners** - Use rounded-2xl for cards, rounded-lg for content
6. **Soft Colors** - Use gray-200 (light) for better UX

## 📱 Mobile Responsive

All skeletons are mobile-first and responsive:

```
Mobile:    1 column
Tablet:    2 columns  
Desktop:   3-4 columns
```

Example with ListingsGridSkeleton:
```typescript
// Automatically responsive
columns={3}
// Renders as: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

## ⚡ Performance

- Zero JavaScript complexity in skeleton components
- Pure CSS animation with animate-pulse
- Minimal DOM footprint
- No image loading
- Instant render time

## 🔗 Related Files

- `src/components/ui/Skeleton.tsx` - Base component
- `src/components/skeletons/` - All skeleton components
- Usage in: `ListingsClient.tsx`, `wishlist/page.tsx`, `page.tsx`

---

**Remember:** Always match skeleton structure to actual component for best UX!
