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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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
                {serializedListing.gender}
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
                        1 Sharing
                        <UserRound size={14} />
                        <UserRound size={14} />
                        <UserRound size={14} />
                        <Tooltip text="Totel Three people in a room" />
                      </span>
                    </td>
                    <td className="px-4 py-2 font-semibold text-emerald-600">
                      ₹{serializedListing.ThreeSharingprice || "—"}
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
                  {serializedListing.amenities.map((amenity: string) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-2 text-sm p-2 bg-blue-50 text-blue-700 rounded-lg">
                      <Check size={14} />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Contact Section */}
          <div className=" pt-6 mt-7">
            <h2 className="text-2xl font-bold text-gray-700 mb-2 flex items-center gap-2">
              Owner Contact
            </h2>
            {/* ProtectedContact Component */}
            <ProtectedContact
              phoneNumber={serializedListing.contactPhone}
              whatsAppNumber={serializedListing.contactWhatsApp}
              listingId={serializedListing._id}
              ownerName={serializedListing.owner}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
