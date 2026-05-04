import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Navbar from "@/components/Navbar";

export default async function HomePage() {
  await connectDB();

  const listings = await Listing.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Navbar />
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect PG
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
            Comfortable, affordable, and close to campus
          </p>
          <Link href="/pg-near-presidency-university">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold">
              Browse Listings
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest Listings Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Latest Listings
          </h2>
          <p className="text-gray-600 text-lg">
            Recently added accommodations near the university
          </p>
        </div>

        {listings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {listings.map((listing: any) => (
                <Link
                  key={listing._id}
                  href={`/listing/${listing.slug}`}
                  className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center overflow-hidden">
                      {listing.images && listing.images.length > 0 ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <p className="text-4xl mb-2">📷</p>
                          <p className="text-sm">No Image</p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {listing.title}
                      </h3>

                      <p className="text-2xl font-bold text-blue-600 mb-3">
                        ₹{listing.price}
                        <span className="text-sm text-gray-500 font-normal">
                          /month
                        </span>
                      </p>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                        📍 {listing.address}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                          {listing.gender}
                        </span>
                        <span>
                          🎓 {(listing.distanceFromUni / 1000).toFixed(1)}km
                        </span>
                      </div>

                      {listing.amenities && listing.amenities.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {listing.amenities
                            .slice(0, 2)
                            .map((amenity: string) => (
                              <span
                                key={amenity}
                                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          {listing.amenities.length > 2 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{listing.amenities.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/pg-near-presidency-university">
                <Button size="lg" variant="outline">
                  View All Listings →
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              No listings available yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-semibold text-lg mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All accommodations are verified for authenticity
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold text-lg mb-2">Direct Contact</h3>
              <p className="text-gray-600">
                Connect with owners via WhatsApp or phone instantly
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="font-semibold text-lg mb-2">Near Campus</h3>
              <p className="text-gray-600">
                All listings are conveniently close to the university
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
