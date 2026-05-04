import ListingsClient from "./ListingsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const res = await fetch("/api/listings?page=1&limit=10`", {
  cache: "no-store",
});

const data = await res.json();
const listings = data.listings || [];

type Listing = {
  _id: string;
  title: string;
  slug: string;
};

export const metadata = {
  title: "PG Near Presidency University Bangalore | Verified PG Listings",
  description:
    "Find PG near Presidency University Bangalore with verified listings, clear pricing, photos, and direct contact with owners. No brokers.",
};

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* ✅ H1 (STRONG SEO SIGNAL) */}
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
          PG Near Presidency University Bangalore
        </h1>

        {/* ✅ SCHEMA (RIGHT AFTER H1) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "PG near Presidency University Bangalore",
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

        {/* ✅ INTRO TEXT */}
        <p className="text-gray-600 max-w-2xl mb-8">
          Looking for a PG near Presidency University Bangalore? Browse verified
          PG listings with clear pricing, amenities, photos, and direct contact
          with owners, without any hassle.
        </p>

        {/* ✅ LISTINGS */}
        <ListingsClient initialListings={listings} />
      </div>

      {/* ✅ SEO CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Why Choose a PG Near Presidency University Bangalore?
        </h2>

        <p className="text-gray-600 mb-4">
          Living near Presidency University Bangalore saves travel time, reduces
          daily stress, and helps students focus more on studies. Most PGs near
          the university offer essential amenities like food, WiFi, and laundry.
        </p>

        <p className="text-gray-600 mb-4">
          However, finding a reliable PG can be difficult due to outdated
          listings, unreliable contact details, and lack of transparency. PG
          Near solves this by providing verified listings, clear pricing, and
          direct contact with PG owners.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
          What You’ll Find Here
        </h3>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            PGs within walking distance of Presidency University Bangalore
          </li>
          <li>1 sharing, 2 sharing, and 3 sharing options</li>
          <li>Verified contact details of PG owners</li>
          <li>Clear pricing with no hidden charges</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}
