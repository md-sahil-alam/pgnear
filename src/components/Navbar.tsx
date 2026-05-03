"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-blue-600">
            🏠 PG Near Uni
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/pg-near-presidency-university"
              className="text-gray-700 hover:text-blue-600 transition font-medium">
              Listings
            </Link>

            {session?.user ? (
              <>
                <Link
                  href="/admin/listings"
                  className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 transition font-medium">
                    {session.user.name || "Account"} ▼
                  </button>
                  <div className="hidden group-hover:block absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/test-login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 py-4 px-4">
            <div className="space-y-3">
              <Link
                href="/pg-near-presidency-university"
                className="block text-gray-700 hover:text-blue-600 transition font-medium py-2"
                onClick={() => setMenuOpen(false)}>
                Listings
              </Link>

              {session?.user ? (
                <>
                  <Link
                    href="/admin/listings"
                    className="block text-gray-700 hover:text-blue-600 transition font-medium py-2"
                    onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-medium py-2">
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/test-login"
                  className="block"
                  onClick={() => setMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
