import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import {
  MessagesSquare,
  PhoneCall,
  MessageCircleMore,
  UserSquare,
  PhoneOutgoing,
} from "lucide-react";
import { UserRound } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { Users, MapPin, IndianRupee, ShieldCheck, Check } from "lucide-react";
import ProtectedContact from "@/components/ProtectedContact";
import ListingHeader from "@/components/ListingHeader";
import { formatGender } from "@/lib/gender";

interface ListingContentProps {
  slug: string;
}

export default async function ListingContent({ slug }: ListingContentProps) {
  await connectDB();
  const listing = await Listing.findOne({ slug, isActive: true });

  if (!listing) {
    notFound();
  }

  // Serialize Mongoose document to plain object
  const serializedListing = JSON.parse(JSON.stringify(listing));

  const whatsappLink = `https://wa.me/${serializedListing.contactWhatsApp}?text=${encodeURIComponent(
    `Hi,${serializedListing.owner} I found your pg at pgnear.in im intrested in your pg: ${serializedListing.title}`,
  )}`;
  const phoneLink = `tel:${serializedListing.contactPhone}`;

  // Generate schema markup for LocalBusiness + AggregateOffer
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: serializedListing.title,
    description: `${serializedListing.title} - PG accommodation near Presidency University Bangalore`,
    image: serializedListing.images?.[0] || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: serializedListing.address || "",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560109",
      addressCountry: "IN",
    },
    telephone: `+91${serializedListing.contactPhone}`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: `+91${serializedListing.contactPhone}`,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: serializedListing.latitude || 13.145,
      longitude: serializedListing.longitude || 77.5986,
    },
    areaServed: "Bangalore",
    priceRange:
      "₹" +
      Math.min(
        serializedListing.threeSharingprice || 999999,
        serializedListing.twoSharingprice || 999999,
        serializedListing.oneSharingprice || 999999,
      ),
    aggregateOffer: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      offers: [
        ...(serializedListing.threeSharingprice
          ? [
              {
                "@type": "Offer",
                name: "3 Sharing",
                price: serializedListing.threeSharingprice,
                availability: "https://schema.org/InStock",
              },
            ]
          : []),
        ...(serializedListing.twoSharingprice
          ? [
              {
                "@type": "Offer",
                name: "2 Sharing",
                price: serializedListing.twoSharingprice,
                availability: "https://schema.org/InStock",
              },
            ]
          : []),
        ...(serializedListing.oneSharingprice
          ? [
              {
                "@type": "Offer",
                name: "1 Sharing",
                price: serializedListing.oneSharingprice,
                availability: "https://schema.org/InStock",
              },
            ]
          : []),
      ],
    },
    amenities: serializedListing.amenities || [],
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: serializedListing.isVerified ? "5" : "4",
      },
      author: {
        "@type": "Organization",
        name: "PG Near",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Back Link */}
      <Link
        href="/pg-near-presidency-university"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Listings
      </Link>

      <div className="bg-white rounded-lg overflow-hidden">
        {/* Images */}
        <ImageGallery images={serializedListing.images || []} />

        {/* Details */}
        <div className="p-8">
          <ListingHeader
            title={serializedListing.title}
            listingId={serializedListing._id}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b color-black">
            <div>
              <p className="text-gray-600 text-sm">Gender</p>
              <p className="text-lg font-semibold capitalize">
                {formatGender(serializedListing.gender)}
              </p>
            </div>
            <div>
              <div className="flex items-center ">
                <p className="text-gray-600 text-sm">From Campus</p>
              </div>
              <p className="text-lg font-semibold">
                {serializedListing.distanceFromUni}m
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Verified</p>
              <p className="text-lg font-semibold">
                {serializedListing.isVerified ? (
                  <div className="flex items-center gap-1 text-emerald-600">
                    <ShieldCheck /> <p>Varified</p>
                  </div>
                ) : (
                  "Not Verified"
                )}
              </p>
            </div>
          </div>

          {/* Price Table */}
          <div className="mb-6">
            <p className="text-gray-600 text-xl font-semibold mb-2 ">Price</p>

            <div className="border rounded-lg  ">
              <table className="w-full text-sm  ">
                <thead className="bg-gray-100  ">
                  <tr>
                    <th className="text-left px-4 py-2 rounded-tl-lg">
                      Sharing
                    </th>
                    <th className="text-left px-4 py-2 rounded-tr-lg">
                      Price / month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-2 py-2">
                      <span className="flex items-center gap-1">
                        3 Sharing
                        <UserRound size={14} />
                        <UserRound size={14} />
                        <UserRound size={14} />
                        <Tooltip text="Totel Three people in a room" />
                      </span>
                    </td>
                    <td className="px-4 py-2 font-semibold text-emerald-600">
                      ₹{serializedListing.threeSharingprice || "—"}
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-2 py-2">
                      <span className="flex items-center gap-1">
                        2 Sharing
                        <UserRound size={14} />
                        <UserRound size={14} />
                        <Tooltip text="Two people in a room" />
                      </span>
                    </td>
                    <td className="px-4 py-2 font-semibold text-emerald-600">
                      ₹{serializedListing.twoSharingprice || "—"}
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-2 py-2">
                      <span className="flex items-center gap-1">
                        1 Sharing
                        <UserRound size={14} />
                        <Tooltip text="Single person (only you) in a room" />
                      </span>
                    </td>
                    <td className="px-4 py-2 font-semibold text-emerald-600">
                      ₹{serializedListing.oneSharingprice || "—"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Address and Distance */}
          <div className="mb-12 flex gap-3 text-sm mt-12">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-blue-600  shrink-0" />
              <span className="text-gray-600">{serializedListing.address}</span>
            </div>
          </div>

          {/* Amenities */}
          {serializedListing.amenities &&
            serializedListing.amenities.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-600 text-lg font-semibold mb-3">
                  Amenities
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {serializedListing.amenities
                    .slice(0, 8)
                    .map((amenity: string) => (
                      <span
                        key={amenity}
                        className="flex items-center gap-2 text-sm p-2 bg-blue-50 text-blue-700 rounded-lg">
                        <Check size={14} />
                        {amenity}
                      </span>
                    ))}
                </div>

                {serializedListing.amenities.length > 8 && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                      Read more
                    </summary>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3">
                      {serializedListing.amenities
                        .slice(8)
                        .map((amenity: string) => (
                          <span
                            key={amenity}
                            className="flex items-center gap-2 text-sm p-2 bg-blue-50 text-blue-700 rounded-lg">
                            <Check size={14} />
                            {amenity}
                          </span>
                        ))}
                    </div>
                  </details>
                )}
              </div>
            )}

          <div className="mb-6">
            <p className="text-gray-600 text-sm">Owner Name</p>
            <p className="text-lg font-semibold">
              {serializedListing.ownerName ||
                serializedListing.owner ||
                "Not provided"}
            </p>
          </div>

          {/* Contact Section */}
          <div className=" pt-6 mt-7 ">
            <h2 className="text-2xl font-bold text-gray-700 mb-2 flex items-center gap-2">
              Owner Contact
            </h2>
            <p className="mb-1">
              booke with us and and earn exciting
              <Link href="/rewards" className="text-emerald-600 font-bold ">
                {" "}
                Cashback Rewards
              </Link>{" "}
              on successful booking.
            </p>

            {/* ProtectedContact Component */}
            <ProtectedContact
              phoneNumber={serializedListing.contactPhone}
              whatsAppNumber={serializedListing.contactWhatsApp}
              listingId={serializedListing._id}
              ownerName={serializedListing.owner}
              pgName={serializedListing.title}
            />
            <p className="text-gray-600 mb-4 text-sm mt-1">
              Contact details are protected to prevent misuse. Click unlock and
              view the contact information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
