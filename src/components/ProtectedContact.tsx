"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  Loader2,
  UnlockIcon,
  PhoneCall,
  HousePlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PhoneLoginModal from "./PhoneLoginModal";
import { Button } from "./ui/Button";
import { Check, Eye } from "lucide-react";
import Link from "next/link";

interface ProtectedContactProps {
  phoneNumber: string;
  whatsAppNumber?: string;
  listingId: string;
  ownerName: string;
  pgName?: string;
}

export default function ProtectedContact({
  phoneNumber,
  whatsAppNumber,
  listingId,
  ownerName,
  pgName,
}: ProtectedContactProps) {
  const { user, loading: authLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const normalizePhone = (value: string) => value.replace(/\D/g, "");

  const getCallLink = () => `tel:+91${normalizePhone(phoneNumber)}`;

  const getWhatsAppLink = () => {
    const whatsAppNum = normalizePhone(whatsAppNumber || phoneNumber);
    const senderName = user?.name?.trim() || "a guest";
    const message = encodeURIComponent(
      `Hi, I'm ${senderName}. I found your PG on pgnear.in. Is it available?`,
    );
    return `https://wa.me/91${whatsAppNum}?text=${message}`;
  };

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
          pgName: pgName || ownerName,
          interactionType: type,
        }),
      });
    } catch (error) {
      console.error("Failed to track interaction:", error);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleCallClick = () => {
    if (typeof window !== "undefined") {
      (window as any).gtag?.("event", "contact", {
        event_category: "lead",
        event_label: "call_click",
      });
    }
    void trackInteraction("call");
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      (window as any).gtag?.("event", "contact", {
        event_category: "lead",
        event_label: "whatsapp_click",
      });
    }

    void trackInteraction("whatsapp");
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
  if (user) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Owner</h3>
          <div className="flex items-center gap-2 mt-1 text-[13px] text-zinc-600">
            <HousePlus size={15} className="text-emerald-600 animate-pulse" />
            <span>Rooms fill fast during admissions.</span>
          </div>
        </div>

        {/* Phone and WhatsApp Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={getCallLink()}
            onClick={handleCallClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
            {trackingLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Call"
            )}
            <Phone size={18} />
          </a>

          {whatsAppNumber && (
            <a
              href={getWhatsAppLink()}
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              {trackingLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <MessageCircle size={18} />
              )}
              WhatsApp
            </a>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-6 text-center">
          Get <span className=" text-emerald-600 font-bold ">Cashback</span>{" "}
          reward on sucessful booking through us.
        </p>

        {/* Contact Details Display */}
        {/* <div className="mt-4 pt-4 border-t border-emerald-200">
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
        </div> */}
      </div>
    );
  }

  // User is logged in but not unlocked yet
  // if (user && !isUnlocked) {
  //   return (
  //     <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
  //       <div className="mb-4">
  //         <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
  //           Contact Unlocked <Check />
  //         </h3>

  //         <p className="text-gray-600 text-sm mt-1">
  //           Click below to view contact details.
  //         </p>
  //       </div>

  //       <Button
  //         onClick={() => setIsUnlocked(true)}
  //         className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
  //         View Contact Details <Eye size={22} />
  //       </Button>
  //     </div>
  //   );
  // }

  // User is not logged in - show blurred contact
  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 pb-3 relative group mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Owner's Contact
          </h3>
          {/* <p className="text-gray-600 text-sm mt-1">
            unlock in to view{" "}
            <span className="text-emerald-600 font-semibold">
              Phone and WhatsApp no.
            </span>{" "}
          </p> */}
          <div className="flex items-center gap-2 mt-2 text-[13px] text-zinc-600">
            <PhoneCall size={15} className="text-emerald-600 " />
            <p>Direct call & WhatsApp of the owner</p>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[13px] text-zinc-600">
            <HousePlus size={15} className="text-emerald-600 animate-pulse" />
            <span>Rooms fill fast during admissions.</span>
          </div>
        </div>

        {/* Blurred Contact Section */}
        {/* <div className="mb-6 blur-sm pointer-events-none">
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
        </div> */}

        {/* Unlock Button */}
        <Button
          onClick={() => setShowLoginModal(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 text-sm ">
          <Eye size={18} />
          View Owner's Contact
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
