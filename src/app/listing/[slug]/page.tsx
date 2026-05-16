import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { ListingDetailSkeleton } from "@/components/skeletons";
import ListingContent from "./components/ListingContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PG Listing Details",
  description: "View detailed information about this PG listing",
};

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
