"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";
import { formatGender } from "@/lib/gender";
import PhoneLoginModal from "@/components/PhoneLoginModal";
import { Heart } from "lucide-react";
import { WishlistPageSkeleton } from "@/components/skeletons";

interface WishlistListing {
  _id: string;
  slug: string;
  title: string;
  images?: string[];
  threeSharingprice?: number;
  address?: string;
  gender?: string;
  distanceFromUni?: number;
  isVerified?: boolean;
  amenities?: string[];
}

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const [listings, setListings] = useState<WishlistListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Show login if not authenticated
    if (!authLoading && !user?.uid) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    if (!user?.uid || authLoading) return;

    // Fetch wishlist
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`/api/wishlist?firebaseUid=${user.uid}`);
        const data = await res.json();

        if (data.success) {
          setListings(data.listings || []);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.uid, authLoading]);

  if (authLoading) {
    return <WishlistPageSkeleton />;
  }

  if (!user?.uid) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <Heart className="mx-auto mb-4 text-gray-300" size={48} />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Please Login
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to view your saved PGs
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Sign in
              </button>
            </div>
          </div>
        </div>

        <PhoneLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            // Reload page to fetch wishlist after login
            window.location.reload();
          }}
        />
      </>
    );
  }

  if (loading) {
    return <WishlistPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/pg-near-presidency-university"
            className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
            ← Back to Listings
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-red-500" size={32} fill="currentColor" />
            <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
          </div>

          <p className="text-gray-600">
            {listings.length === 0
              ? "You haven't saved any PGs yet"
              : `You have ${listings.length} saved PG${listings.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Empty State */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Heart className="mx-auto mb-4 text-gray-300" size={48} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No saved PGs yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start saving your favorite PGs to view them here later
            </p>
            <Link
              href="/pg-near-presidency-university"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
              Browse Listings
            </Link>
          </div>
        ) : (
          /* Listings Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
                {/* Image */}
                <Link href={`/listing/${listing.slug}`}>
                  <div className="relative h-52 overflow-hidden bg-gray-200 group cursor-pointer">
                    {listing.images?.length ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* Verified badge */}
                    {listing.isVerified && (
                      <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                        Verified
                      </span>
                    )}

                    {/* Save Button */}
                    <div className="absolute top-3 right-3">
                      <SaveButton listingId={listing._id} size="md" />
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <Link href={`/listing/${listing.slug}`}>
                  <div className="p-5 hover:bg-gray-50 transition">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition">
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
                        {formatGender(listing.gender)}
                      </span>
                      <span>
                        {listing.distanceFromUni
                          ? `${(listing.distanceFromUni / 1000).toFixed(1)}km`
                          : "—"}
                      </span>
                    </div>

                    {/* Amenities */}
                    {listing.amenities && listing.amenities.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-3">
                        {listing.amenities.slice(0, 2).map((amenity) => (
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
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
