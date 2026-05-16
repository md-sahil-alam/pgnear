import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | PG Near",
  description:
    "Learn how PG Near collects, uses, and protects your data while helping you find PG near Presidency University Bangalore.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">PG Near</span>, your privacy is
          important to us. This Privacy Policy explains how we collect, use,
          store, and protect your information when you use our platform.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          1. Information We Collect
        </h2>

        <p className="text-gray-600 mb-4">
          We may collect the following information:
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Your phone number when contacting PG owners</li>

          <li>
            Basic usage information such as pages visited and interactions
          </li>

          <li>
            Information you provide while browsing or interacting with listings
          </li>

          <li>
            Booking confirmation, payment receipt, or admission proof submitted
            for cashback or verification purposes
          </li>

          <li>
            Communication details shared during support or verification
            processes
          </li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          2. How We Use Your Information
        </h2>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>To connect users with PG owners</li>

          <li>To improve our platform and user experience</li>

          <li>To verify bookings and cashback requests</li>

          <li>To prevent fraud, fake claims, or misuse of the platform</li>

          <li>To maintain listing quality and platform trust</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          3. Data Sharing
        </h2>

        <p className="text-gray-600">
          We do not sell your personal information. Limited information may be
          shared with PG owners when necessary to help users connect with
          listings, verify successful bookings, or process cashback claims.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          4. Data Security
        </h2>

        <p className="text-gray-600">
          We take reasonable precautions to protect your information from
          unauthorized access, misuse, or disclosure. While we work to keep your
          data secure, no online platform can guarantee complete security of
          information.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          5. Your Choices
        </h2>

        <p className="text-gray-600">
          You may choose not to share certain information with us. However, some
          platform features, including contacting PG owners or cashback
          verification, may not function properly without the required details.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          6. Cookies & Analytics
        </h2>

        <p className="text-gray-600">
          PG Near may use cookies, analytics tools, or similar technologies to
          understand user behavior, improve website performance, and enhance
          user experience.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          7. Data Retention
        </h2>

        <p className="text-gray-600">
          We may retain certain user information, booking proofs, and
          communication records for verification, fraud prevention, legal,
          operational, and support purposes.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          8. Third-Party Links & Services
        </h2>

        <p className="text-gray-600">
          Our platform may contain links to third-party websites, WhatsApp, or
          external services. We are not responsible for the privacy practices or
          content of third-party platforms.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          9. Changes to This Policy
        </h2>

        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. Any changes will
          be reflected on this page. Continued use of the platform after updates
          means you accept the revised policy.
        </p>

        {/* Section 10 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          10. Contact Us
        </h2>

        <p className="text-gray-600">
          If you have any questions regarding this Privacy Policy, feel free to
          contact us.
        </p>
      </div>

      <Footer />
    </div>
  );
}
