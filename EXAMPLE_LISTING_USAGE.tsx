"use client";

// Example implementation of ProtectedContact in a listing page
// Copy this to your actual listing page (src/app/listing/[slug]/page.tsx)

import ProtectedContact from "@/components/ProtectedContact";
import Image from "next/image";

export default function ExampleListingPage() {
  // This is sample data - in production, fetch from your database
  const listing = {
    id: "64a1b2c3d4e5f6g7h8i9j0k1",
    title: "Spacious 2-Sharing PG Near Presidency University",
    ownerName: "Raj Kumar Singh",
    phoneNumber: "9876543210",
    whatsAppNumber: "9876543210",
    description: "Beautiful PG with all modern amenities...",
    price: "₹8,000/month",
    images: ["/pg1.jpg"],
    amenities: ["WiFi", "AC", "Hot Water", "Mess"],
    address: "Near Presidency University, Bangalore",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {listing.title}
        </h1>
        <p className="text-gray-600 mb-6">{listing.address}</p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="mb-8">
              <div className="bg-gray-200 rounded-lg overflow-hidden h-96 mb-4">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-blue-600">
                {listing.price}
              </p>
              <p className="text-gray-600">Includes meals</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                About This PG
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {listing.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-gray-900 font-semibold">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Contact Owner
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Sign in to unlock contact details and message the owner
                </p>

                {/* ProtectedContact Component */}
                <ProtectedContact
                  phoneNumber={listing.phoneNumber}
                  whatsAppNumber={listing.whatsAppNumber}
                  listingId={listing.id}
                  ownerName={listing.ownerName}
                />
              </div>

              {/* Additional Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>📍 Distance:</strong> 2 km from university
                </p>
                <p className="text-sm text-blue-900 mt-2">
                  <strong>⭐ Verified:</strong> Owner verified with ID
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
