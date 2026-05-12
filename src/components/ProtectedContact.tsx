"use client";

import React, { useState } from "react";
import { Lock, Phone, MessageCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PhoneLoginModal from "./PhoneLoginModal";
import { Button } from "./ui/Button";
import { Check, Eye, EyeOff } from "lucide-react";

interface ProtectedContactProps {
  phoneNumber: string;
  whatsAppNumber?: string;
  listingId: string;
  ownerName: string;
}

export default function ProtectedContact({
  phoneNumber,
  whatsAppNumber,
  listingId,
  ownerName,
}: ProtectedContactProps) {
  const { user, loading: authLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const trackInteraction = async (type: "call" | "whatsapp") => {
    if (!user) return;

    setTrackingLoading(true);
    try {
      await fetch("/api/interactions/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: user.uid,
          listingId: listingId,
          interactionType: type,
        }),
      });
    } catch (error) {
      console.error("Failed to track interaction:", error);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleCallClick = async () => {
    await trackInteraction("call");
    window.location.href = `tel:+91${phoneNumber}`;
  };

  const handleWhatsAppClick = async () => {
    await trackInteraction("whatsapp");
    const whatsAppNum = whatsAppNumber || phoneNumber;
    window.location.href = `https://wa.me/91${whatsAppNum}?text=Hi, i found your pg form pgnear.in I'm interested in your PG`;
  };

  const handleLoginSuccess = (userData: any) => {
    setIsUnlocked(true);
    setShowLoginModal(false);
  };

  if (authLoading) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-32">
        <Loader2 size={24} className="animate-spin text-gray-600" />
      </div>
    );
  }

  // User is logged in and unlocked
  if (user && isUnlocked) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact {ownerName}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            You've unlocked the contact details for this PG
          </p>
        </div>

        {/* Phone and WhatsApp Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCallClick}
            disabled={trackingLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
            {trackingLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Phone size={18} />
            )}
            Call: {phoneNumber}
          </Button>

          {whatsAppNumber && (
            <Button
              onClick={handleWhatsAppClick}
              disabled={trackingLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              {trackingLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <MessageCircle size={18} />
              )}
              WhatsApp
            </Button>
          )}
        </div>

        {/* Contact Details Display */}
        <div className="mt-4 pt-4 border-t border-emerald-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Phone Number</p>
              <p className="text-gray-900 font-semibold">+91 {phoneNumber}</p>
            </div>
            {whatsAppNumber && (
              <div>
                <p className="text-gray-600 text-sm">WhatsApp</p>
                <p className="text-gray-900 font-semibold">
                  +91 {whatsAppNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // User is logged in but not unlocked yet
  if (user && !isUnlocked) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
            Contact Unlocked <Check />
          </h3>

          <p className="text-gray-600 text-sm mt-1">
            Click below to view contact details.
          </p>
        </div>

        <Button
          onClick={() => setIsUnlocked(true)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
          View Contact Details <Eye size={22} />
        </Button>
      </div>
    );
  }

  // User is not logged in - show blurred contact
  return (
    <>
      <div className="bg-gray-100 rounded-lg p-6 relative group">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Owners's Contact
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Sign in to view contact details
          </p>
        </div>

        {/* Blurred Contact Section */}
        <div className="mb-6 blur-sm pointer-events-none">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              disabled
              className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <Phone size={18} />
              ••••• •••••
            </Button>

            <Button
              disabled
              className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Unlock Button */}
        <Button
          onClick={() => setShowLoginModal(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
          <Lock size={18} />
          Unlock Contact Details
        </Button>

        <p className="text-center text-gray-500 text-xs mt-4">
          Free & Secure • One-time login
        </p>
      </div>

      {/* Login Modal */}
      <PhoneLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
