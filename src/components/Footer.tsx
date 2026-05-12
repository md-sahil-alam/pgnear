import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">PG Near</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Find verified PG near Presidency University Bangalore with real
              photos, pricing, and direct contact. No brokers, no commition.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              located in Rajanakunte, Yelahanka, Bengaluru, Karnataka, India.
            </p>
          </div>
          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pg-near-presidency-university"
                  className="hover:text-blue-600 transition">
                  Browse Pg near Presidency University Bangalore
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About
                </Link>
              </li>
              <li>
                {/* <Link
                  href="/contact"
                  className="hover:text-blue-600 transition">
                  Contact
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Why PG Near
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Verified PG Listings</li>
              <li>Direct Owner Contact</li>
              <li>Close to Presedency University</li>
              <li>Student-friendly options</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="mailto:pgnear.in@gmail.com"
                  className="hover:text-blue-600 transition">
                  pgnear.in@gmail.com
                </a>
              </li>
              <li>+91 8709555934</li>
              <li className="text-xs text-gray-500 mt-2">
                Typically responds within a few hours
              </li>
              <li className="mt-6">
                <a
                  href="https://www.mdsahilalam.com/"
                  target="_blank"
                  className="hover:text-blue-600 transition ">
                  Portfolio: mdsahilalam.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/md-sahil-alam-software-developer/"
                  target="_blank"
                  className="hover:text-blue-600 transition">
                  LinkedIn: Md Sahil Alam Software Developer
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/md-sahil-alam"
                  target="_blank"
                  className="hover:text-blue-600 transition">
                  GitHub: md sahil alam Software engineer
                </a>
              </li>
              <li className="text-xs text-gray-500 mt-2">
                <p>Based in Bangalore</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} PG Near. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-blue-600 transition">
              Privacy
            </a>
            <a href="/terms" className="hover:text-blue-600 transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
