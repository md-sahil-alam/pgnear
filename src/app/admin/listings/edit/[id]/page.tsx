import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { notFound } from "next/navigation";
import EditListingForm from "./EditListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    await connectDB();
    const listing = await Listing.findById(id);

    if (!listing) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <EditListingForm listing={JSON.parse(JSON.stringify(listing))} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
