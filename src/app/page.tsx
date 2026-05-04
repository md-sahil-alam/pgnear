import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, MapPin, IndianRupee, ShieldCheck } from "lucide-react";

export default async function HomePage() {
  await connectDB();

  const listings = await Listing.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Navbar />
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777930318/ChatGPT_Image_May_5_2026_03_01_21_AM_fn0nbu.png"
          alt="PG near Presidency University Bangalore"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Optional subtle dark overlay (for readability) */}
        <div
          className="absolute inset-0 
            bg-white/80
            backdrop-blur-2xl
            mask-[linear-gradient(to_top,black,transparent)]"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 px-4">
          <div className="px-6 py-6 text-center max-w-2xl w-full ">
            <h1 className="text-2xl md:text-5xl font-bold  leading-tight">
              Find PG Near Presidency University Bangalore
            </h1>

            <p className="  mt-2 text-sm md:text-base ">
              Varified PG listings. Clear pricing. Direct contact.
            </p>

            <div className="mt-5">
              <Link href="/pg-near-presidency-university  ">
                <p className=" hover:text-blue-500 ">Browse Listings →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest PG Listings
            </h2>
            <p className="text-gray-600 mt-2">
              Recently added PGs near Presidency University
            </p>
          </div>

          <Link
            href="/pg-near-presidency-university"
            className="hidden md:block text-blue-600 font-semibold hover:underline">
            View all →
          </Link>
        </div>

        {/* Listings */}
        {listings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing: any) => (
                <Link
                  key={listing._id}
                  href={`/listing/${listing.slug}`}
                  className="group block">
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition hover:shadow-lg">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      {listing.images?.length ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                          No Image
                        </div>
                      )}

                      {/* Verified badge */}
                      {listing.isVerified && (
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
                        {listing.title}
                      </h3>

                      {/* Price */}
                      <p className="text-lg font-bold text-emerald-600 mt-2">
                        ₹{listing.threeSharingprice || "—"}
                        <span className="text-sm text-gray-500 font-normal">
                          /month
                        </span>
                      </p>

                      {/* Location */}
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {listing.address || "Location not available"}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                        <span className="capitalize">
                          {listing.gender || "Any"}
                        </span>
                        <span>
                          {listing.distanceFromUni
                            ? `${listing.distanceFromUni}m`
                            : "--"}
                        </span>
                      </div>

                      {/* Amenities */}
                      {listing.amenities?.length > 0 && (
                        <div className="flex gap-2 flex-wrap mt-3">
                          {listing.amenities.slice(0, 2).map((a: string) => (
                            <span
                              key={a}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                              {a}
                            </span>
                          ))}

                          {listing.amenities.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{listing.amenities.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="text-center mt-10 ">
              <Link href="/pg-near-presidency-university">
                <button className="px-6 py-3 border rounded-lg font-medium">
                  View All Listings →
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No listings available yet</p>
          </div>
        )}
      </section>

      {/* Features/why us Section */}
      <section>
        <div className="max-w-6xl mx-auto px-12 py-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built for the Students. By the Students.
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We understand what matters when choosing a PG because we’ve been
              through it ourselves.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Brokers. Direct Contact
              </h3>
              <p className="text-gray-600 text-sm">
                Talk directly to PG owners. No middlemen, no commition.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verified Listings
              </h3>
              <p className="text-gray-600 text-sm">
                Only genuine PGs listed to save your time and effort.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Built by Someone Like You
              </h3>
              <p className="text-gray-600 text-sm">
                Created by a student who faced the same struggle and decided to
                fix it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
