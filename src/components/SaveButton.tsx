"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PhoneLoginModal from "./PhoneLoginModal";
import { Tooltip } from "./ui/Tooltip";

interface SaveButtonProps {
  listingId: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function SaveButton({
  listingId,
  size = "md",
  showLabel = false,
}: SaveButtonProps) {
  const { user, loading: authLoading } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check wishlist status when user is authenticated
  useEffect(() => {
    if (authLoading) return;

    if (!user?.uid) {
      setChecked(true);
      return;
    }

    const checkWishlist = async () => {
      try {
        const res = await fetch(`/api/wishlist?firebaseUid=${user.uid}`);

        const data = await res.json();

        if (data.success) {
          const saved = data.listings.some(
            (item: any) => item._id === listingId,
          );

          setIsSaved(saved);
        }
      } catch (error) {
        console.error("Failed to check wishlist:", error);
      } finally {
        setChecked(true);
      }
    };
    checkWishlist();
  }, [listingId, user?.uid, authLoading]);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Show login modal if not logged in
    if (!user?.uid) {
      setShowLoginModal(true);
      return;
    }

    if (loading) return;

    const previousState = isSaved;

    // Optimistic UI update
    setIsSaved(!previousState);
    setLoading(true);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId,
          firebaseUid: user.uid,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        // Rollback if failed
        setIsSaved(previousState);
        return;
      }

      setIsSaved(data.isSaved);
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);

      // Rollback on error
      setIsSaved(previousState);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Re-check wishlist after login
    setChecked(false);
  };

  if (!checked) return null;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  return (
    <>
      <div className="flex gap-3">
        <Tooltip text={isSaved ? "Remove from Wishlist" : "Add to Wishlist"} />
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`flex items-center justify-center gap-2 rounded-lg transition-all duration-200 ${sizeClasses[size]} ${
            isSaved
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isSaved ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart
            size={iconSizes[size]}
            fill={isSaved ? "currentColor" : "none"}
            className="transition-all duration-200"
          />
        </button>

        {/* {showLabel && (
          <span className="text-xs font-medium m-1">
            {isSaved ? "Saved" : "Save"}
          </span>
        )} */}
      </div>
      {/* Phone Login Modal */}
      <PhoneLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
