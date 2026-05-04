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
          important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you use our platform.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          We may collect the following information:
        </p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Your phone number (when you choose to contact a PG owner)</li>
          <li>Basic usage data (such as pages visited)</li>
          <li>
            Information you provide while browsing or interacting with listings
          </li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>To connect you with PG owners</li>
          <li>To improve our platform and user experience</li>
          <li>To ensure listings are relevant and useful</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          3. Data Sharing
        </h2>
        <p className="text-gray-600">
          We do not sell your personal data. Your information is only shared
          when necessary to connect you with PG owners or to operate the
          platform.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          4. Data Security
        </h2>
        <p className="text-gray-600">
          We take reasonable measures to protect your information from
          unauthorized access or misuse. However, no system is completely
          secure.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          5. Your Choices
        </h2>
        <p className="text-gray-600">
          You can choose not to share your personal information. However, some
          features (like contacting PG owners) may not work without it.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          6. Changes to This Policy
        </h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. Changes will be
          reflected on this page.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          7. Contact Us
        </h2>
        <p className="text-gray-600">
          If you have any questions about this Privacy Policy, feel free to
          contact us.
        </p>
      </div>

      <Footer />
    </div>
  );
}
