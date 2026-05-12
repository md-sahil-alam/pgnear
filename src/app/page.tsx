import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, MapPin, IndianRupee, ShieldCheck, Heart } from "lucide-react";
import HomeListings from "@/components/HomeListings";
import { Suspense } from "react";
import { HomePageSkeleton } from "@/components/skeletons";

export default async function HomePage() {
  await connectDB();

  const listings = await Listing.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(6);

  // Serialize Mongoose documents to plain objects
  const serializedListings = JSON.parse(JSON.stringify(listings));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Navbar />
      <section className="relative w-full h-[70vh] min-h-125 overflow-hidden">
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

            <div className="mt-5 w-2/4 md:w-1/4 tracking-wide mx-auto">
              <Link href="/pg-near-presidency-university  ">
                <p className=" text-blue-600 border-2 rounded-md  hover:text-blue-700  ">
                  View All pg →
                </p>
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
        {serializedListings.length > 0 ? (
          <>
            <Suspense fallback={<HomePageSkeleton />}>
              <HomeListings listings={serializedListings} />
            </Suspense>

            <div className="text-center mt-10">
              <Link href="/pg-near-presidency-university">
                <Button size="lg" variant="outline">
                  View All Listings →
                </Button>
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
              Built for the Students, By the Students
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
                Direct Contact
              </h3>
              <p className="text-gray-600 text-sm">
                Talk directly to PG owners. No middlemen, no commition.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="flex gap-2.5">
                <Heart className="text-red-500 mt-1" size={18} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  save time & reduce stress
                </h3>
              </div>

              <p className="text-gray-600 text-sm">
                Save pgs in your <span className="font-bold ">wishlist</span> to
                view them later and make an informed decision without the rush.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verified Listings
              </h3>
              <p className="text-gray-600 text-sm">
                Only genuine PGs listed to save your time and effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
