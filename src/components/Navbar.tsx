"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { Heart, LogOut, Shield } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.isAdmin;

  const handleLogout = async () => {
    await signOut();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/50 backdrop-blur-[9px] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="font-bold text-3xl text-blue-600">
            PG Near
            <p className="text-sm text-gray-500 -mt-1 italic font-normal">
              Presidency University
            </p>
          </Link>

          {/* DESKTOP MENU */}
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
              className="text-red-600 transition font-medium flex items-center gap-2">
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition font-medium">
              About Us
            </Link>

            {/* ADMIN ROUTES */}
            {isAdmin && (
              <>
                <div className="h-6 w-1px bg-gray-300" />

                <Link
                  href="/admin/analytics"
                  className="text-blue-600 font-semibold flex items-center gap-2">
                  <Shield size={18} />
                  Admin
                </Link>

                <Link
                  href="/admin/listings"
                  className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Manage Listings
                </Link>

                <Link
                  href="/admin/listings/new"
                  className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Add Listing
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex gap-6 md:hidden items-center">
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-red-600 font-medium">
              <Heart size={18} />
              Wishlist
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-gray-700">
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-medium">
              Home
            </Link>

            <Link
              href="/pg-near-presidency-university"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-medium">
              Listings
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-medium">
              About Us
            </Link>

            {/* ADMIN MOBILE */}
            {isAdmin && (
              <>
                <div className="border-t pt-3 space-y-3">
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-blue-600 font-semibold">
                    <Shield size={18} />
                    Admin Panel
                  </Link>

                  <Link
                    href="/admin/listings"
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-700 font-medium">
                    Manage Listings
                  </Link>

                  <Link
                    href="/admin/listings/create"
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-700 font-medium">
                    Add Listing
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 font-medium">
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
