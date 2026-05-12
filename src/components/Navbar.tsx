"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Heart, LogOut } from "lucide-react";
import PhoneLoginModal from "./PhoneLoginModal";

export default function Navbar() {
  const { user, logout, loading: authLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/50 backdrop-blur-[9px] sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-3xl text-blue-600 ">
            PG Near{" "}
            <p className="text-sm text-gray-500 -mt-1 font-style: italic font-normal">
              Presidency University
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition font-medium">
              Home
            </Link>

            <Link
              href="/pg-near-presidency-university"
              className="text-gray-700 hover:text-blue-600 transition font-medium">
              Listings
            </Link>

            <Link
              href="/wishlist"
              className=" text-red-600 transition font-medium py-2 flex items-center gap-2 "
              onClick={() => setMenuOpen(false)}>
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition font-medium">
              About us
            </Link>

            {/* {!authLoading && user?.uid ? (
              <>
                <Link
                  href="/wishlist"
                  className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center gap-1">
                  <Heart size={20} />
                  Wishlist
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 transition font-medium">
                    {user.name || "Account"} ▼
                  </button>
                  <div className="hidden group-hover:block absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition flex items-center gap-2">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-end gap-5 md:hidden">
            <Link
              href="/wishlist"
              className=" text-blue-600 transition font-medium py-1 flex items-center gap-2 md:hidden"
              onClick={() => setMenuOpen(false)}>
              Wishlist
              <Heart size={18} />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 text-2xl">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden  border-t border-b border-gray-200 py-4 px-4">
            <div className="space-y-3">
              <Link
                href="/pg-near-presidency-university"
                className="block text-blue-600 transition font-medium py-2"
                onClick={() => setMenuOpen(false)}>
                Listings
              </Link>

              {/* {!authLoading && user?.uid ? (
                <>
                  <Link
                    href="/wishlist"
                    className=" text-blue-600 transition font-medium py-2 flex items-center gap-2 border-t border-gray-200"
                    onClick={() => setMenuOpen(false)}>
                    <Heart size={18} />
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className=" w-full text-left text-blue-600 transition font-medium py-2 border-t border-gray-200 flex items-center gap-2">
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium border-t border-gray-200">
                  Login
                </button>
              )} */}
            </div>
          </div>
        )}
      </div>

      {/* Phone Login Modal */}
      <PhoneLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          setMenuOpen(false);
        }}
      />
    </nav>
  );
}
