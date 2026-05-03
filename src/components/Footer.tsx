import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              🏠 PG Near Uni
            </h3>
            <p className="text-sm text-gray-400">
              Find comfortable and affordable paying guest accommodations near
              your university.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/listings"
                  className="hover:text-blue-400 transition">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/test-login"
                  className="hover:text-blue-400 transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 transition cursor-default">
                ✓ Verified Listings
              </li>
              <li className="hover:text-blue-400 transition cursor-default">
                ✓ Direct Contact
              </li>
              <li className="hover:text-blue-400 transition cursor-default">
                ✓ Distance Info
              </li>
              <li className="hover:text-blue-400 transition cursor-default">
                ✓ Filter by Amenities
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                📧{" "}
                <a
                  href="mailto:support@pgnearuni.com"
                  className="hover:text-blue-400 transition">
                  support@pgnearuni.com
                </a>
              </li>
              <li>📱 +91 9876543210</li>
              <li className="text-gray-400 text-xs mt-2">
                Available 24/7 for assistance
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-6">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} PG Near University. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-blue-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
