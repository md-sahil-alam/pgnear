import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | PG Near",
  description:
    "Read the terms and conditions for using PG Near to find PG near Presidency University Bangalore.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 mb-6">
          By using <span className="font-semibold">PG Near</span>, you agree to
          the following terms. Please read them carefully before using our
          platform.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          1. Use of the Platform
        </h2>
        <p className="text-gray-600">
          PG Near is a platform that helps users find PG accommodations near
          Presidency University Bangalore. You agree to use the platform only
          for lawful purposes.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          2. Listings Information
        </h2>
        <p className="text-gray-600">
          We try to keep listings accurate and up to date. However, we do not
          guarantee the accuracy, completeness, or reliability of any listing.
          Users are responsible for verifying details directly with PG owners.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          3. No Brokerage or Guarantee
        </h2>
        <p className="text-gray-600">
          PG Near does not act as a broker. We only provide a platform to
          connect users with PG owners. We do not guarantee availability,
          pricing, or quality of any PG.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          4. User Responsibility
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Verify all information before making decisions</li>
          <li>Communicate respectfully with PG owners</li>
          <li>Do not misuse contact information</li>
        </ul>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          5. Cashback & Booking Verification
        </h2>

        <p className="text-gray-600 mb-4">
          PG Near may offer cashback rewards to users who successfully book a PG
          through our platform and provide valid proof of booking.
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Cashback eligibility is subject to successful verification.</li>
          <li>
            Users may be asked to provide booking confirmation, payment receipt,
            booking proof, or other relevant details.
          </li>
          <li>
            Cashback amounts may vary and are not guaranteed for every booking.
          </li>
          <li>
            Fake, edited, misleading, or invalid proofs may result in rejection
            of cashback requests.
          </li>
          <li>
            PG Near reserves the right to approve, reject, or cancel cashback
            claims at its discretion.
          </li>
        </ul>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          6. Prohibited Activities
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Posting false or misleading information</li>
          <li>Using the platform for illegal purposes</li>
          <li>Attempting to harm or disrupt the platform</li>
          <li>Submitting fake booking proofs or cashback claims</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          7. Privacy & User Data
        </h2>

        <p className="text-gray-600">
          By using PG Near, you agree that we may collect and store limited user
          information such as contact details, booking proofs, and communication
          records for verification, support, and platform improvement purposes.
          We do not sell personal user data to third parties.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          8. Listing Removal & Suspension
        </h2>

        <p className="text-gray-600">
          PG Near reserves the right to remove, suspend, or edit any listing
          that contains false information, inappropriate content, spam, or
          violates our platform policies.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          9. Third-Party Interactions
        </h2>

        <p className="text-gray-600">
          Any agreements, payments, or disputes between users and PG owners are
          handled directly between the involved parties. PG Near is not
          responsible for third-party actions, behavior, or transactions.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          10. Cashback Processing
        </h2>

        <p className="text-gray-600">
          Cashback rewards may take time to process after successful
          verification. Processing timelines may vary depending on booking
          confirmation and owner validation.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          11. Limitation of Liability
        </h2>
        <p className="text-gray-600">
          PG Near is not responsible for any loss, damage, or issues arising
          from interactions between users and PG owners.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          12. Platform Content
        </h2>

        <p className="text-gray-600">
          The PG Near name, branding, website design, and platform content may
          not be copied, reproduced, or misused without permission.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          13. Changes to Terms
        </h2>
        <p className="text-gray-600">
          We may update these terms at any time. Continued use of the platform
          means you accept the updated terms.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          14. Contact
        </h2>
        <p className="text-gray-600">
          If you have any questions about these terms, feel free to contact us.
        </p>
      </div>

      <Footer />
    </div>
  );
}
