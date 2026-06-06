import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { ListingDetailSkeleton } from "@/components/skeletons";
import ListingContent from "./components/ListingContent";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    await connectDB();
    const listing = await Listing.findOne({ slug, isActive: true });

    if (!listing) {
      return {
        title: "Listing Not Found",
        description: "The listing you are looking for does not exist.",
      };
    }

    return {
      title: `${listing.title} - PG Near Presidency University Bangalore`,
      description: `${listing.title} - ₹${listing.threeSharingprice || listing.twoSharingprice || "Contact for price"}/month. ${listing.amenities?.slice(0, 3).join(", ") || ""} near Presidency University Bangalore.`,
      openGraph: {
        title: listing.title,
        description: `PG near Presidency University - ${listing.threeSharingprice || listing.twoSharingprice || "Contact for price"}/month`,
        url: `https://pgnear.in/listing/${listing.slug}`,
        siteName: "PG Near",
        type: "website",
      },
      keywords: [
        "PG near Presidency University",
        listing.title,
        "Bangalore",
        listing.gender === "girls" ? "girls hostel" : "boys hostel",
        ...(listing.amenities?.slice(0, 5) || []),
      ],
    };
  } catch (error) {
    return {
      title: "PG Listing Details",
      description: "View detailed information about this PG listing",
    };
  }
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<ListingDetailSkeleton />}>
          <ListingContent slug={slug} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
