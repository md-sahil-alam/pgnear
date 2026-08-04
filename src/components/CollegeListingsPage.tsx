import ListingsClient from "@/app/pg-near-presidency-university/ListingsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { ListingsPageSkeleton } from "@/components/skeletons";
import Link from "next/link";

type Listing = {
  _id: string;
  title: string;
  slug: string;
};

type Props = {
  title: string;
  description: string;
  collegeName: string;
  listings: Listing[];
  college: string;
  gender?: string;
};

export default function CollegeListingsPage({
  title,
  description,
  collegeName,
  listings,
  college,
  gender,
}: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Suspense fallback={<ListingsPageSkeleton />}>
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-8">
          <a
            href="/rewards"
            className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 duration-300 hover:scale-105 transition-all mb-2 lg:ml-5  ">
            <span className=" p-1 rounded-full bg-emerald-600 mr-2 animate-ping   "></span>
            Cashback rewards 🎉
          </a>
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 lg:ml-5">
            {title}
          </h1>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: title,
                itemListElement: listings.map(
                  (listing: Listing, index: number) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: listing.title,
                    url: `https://pgnear.in/listing/${listing.slug}`,
                  }),
                ),
              }),
            }}
          />

          <p className="text-gray-600 max-w-2xl mb-4 lg:ml-5">{description}</p>

          <div className=" italic flex gap-3 lg:ml-5 mb-8 text-sm">
            <span className="border border-blue-600 rounded-xl px-2 ">
              <Link href={`/pg-near/${college}/boys`}>Boys PGs</Link>
            </span>

            <span className="border border-pink-500 rounded-xl px-2 ">
              {" "}
              <Link href={`/pg-near/${college}/girls`}>Girls PGs</Link>
            </span>

            <span className="border border-black rounded-xl px-2 ">
              <Link href={`/pg-near/${college}`}>All PGs</Link>
            </span>
          </div>

          <ListingsClient
            initialListings={listings}
            college={college}
            gender={gender}
          />
        </div>
      </Suspense>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 ">
          Why Choose a PG Near {collegeName}?
        </h2>

        <p className="text-gray-600 mb-4">
          Living near {collegeName} saves travel time, reduces daily stress, and
          helps students focus more on studies.
        </p>

        <p className="text-gray-600 mb-4">
          PG Near helps students find verified PGs with transparent pricing,
          amenities, photos, and direct owner contact.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
          What You'll Find Here
        </h3>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Verified PG accommodations near {collegeName}</li>
          <li>1 sharing, 2 sharing, and 3 sharing options</li>
          <li className="text-blue-500 italic underline">
            <Link href={`/pg-near/${college}/boys`}>
              Boys PGs near {collegeName}
            </Link>
          </li>

          <li className="text-blue-500 italic underline">
            <Link href={`/pg-near/${college}/girls`}>
              Girls PGs near {collegeName}
            </Link>
          </li>
          <li>Verified owner contact details</li>
          <li>Transparent pricing with no hidden charges</li>
          <li>Wishlist feature for comparing PGs</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}
