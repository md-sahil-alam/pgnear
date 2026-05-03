import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectDB();
  const listing = await Listing.findOne({ slug, isActive: true });

  if (!listing) {
    notFound();
  }

  const whatsappLink = `https://wa.me/${listing.contactWhatsApp}?text=${encodeURIComponent(
    `Hi, I'm interested in your listing: ${listing.title}`,
  )}`;
  const phoneLink = `tel:${listing.contactPhone}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/pg-near-presidency-university"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to Listings
        </Link>

        <div className="bg-white rounded-lg overflow-hidden">
          {/* Images */}
          <ImageGallery images={listing.images || []} />

          {/* Details */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>

            {/* Price and Basic Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-600 text-sm">Price</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{listing.price}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Gender</p>
                <p className="text-lg font-semibold capitalize">
                  {listing.gender}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Distance from Uni</p>
                <p className="text-lg font-semibold">
                  {listing.distanceFromUni}m
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Verified</p>
                <p className="text-lg font-semibold">
                  {listing.isVerified ? "✓ Yes" : "Not Verified"}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="text-gray-700">{listing.address}</p>
            </div>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity: string) => (
                    <span
                      key={amenity}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold">
                  <span>💬</span>
                  WhatsApp
                </a>
                <a
                  href={phoneLink}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                  <span>📞</span>
                  Call
                </a>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Phone: {listing.contactPhone} | WhatsApp:{" "}
                {listing.contactWhatsApp}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
