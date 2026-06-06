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
          <li>Verify all information before making decisions.</li>
          <li>Communicate respectfully with PG owners.</li>
          <li>Do not misuse contact information.</li>
        </ul>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          5. Cashback & Booking Verification
        </h2>

        <p className="text-gray-600 mb-4">
          PG Near may offer cashback rewards of up to ₹500 to eligible users who
          successfully book a PG through our platform and complete the
          verification process.
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            Cashback is available only for genuine and successfully completed PG
            bookings.
          </li>
          <li>
            Users must submit valid booking proof, such as payment receipts,
            screenshots, booking confirmations, or other documents requested by
            PG Near.
          </li>
          <li>
            All cashback claims are subject to verification with the respective
            PG owner.
          </li>
          <li>
            Cashback amounts may vary depending on the PG, offer, or promotional
            campaign.
          </li>
          <li>
            Users can claim cashback by contacting PG Near on WhatsApp at{" "}
            <span className="font-medium">+91 8709555934</span> and submitting
            the required booking proof.
          </li>
          <li>
            Cashback processing may take up to 14 days after successful
            verification.
          </li>
          <li>
            Users may be asked to provide UPI details or other payment
            information for reward processing.
          </li>
          <li>
            Rewards are only applicable for genuine and completed bookings. If a
            booking is cancelled, reversed, refunded, found to be fraudulent, or
            cannot be verified with the PG owner, rewards may be rejected or
            recovered.
          </li>
          <li>
            Fake, edited, misleading, duplicate, or fraudulent claims may result
            in rejection of rewards and suspension from future reward programs.
          </li>
        </ul>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          6. Referral Program
        </h2>

        <p className="text-gray-600 mb-4">
          PG Near may offer referral rewards to users who successfully refer new
          students who later complete a verified PG booking through our
          platform.
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            Referrers may earn rewards of up to ₹200 for each successfully
            verified booking.
          </li>
          <li>
            Referral rewards are only considered when the booked student
            provides the referrer's name and phone number during the
            verification process.
          </li>
          <li>
            Referral rewards are processed only after booking verification and
            owner confirmation of sucessful booking.
          </li>
          <li>
            There is no fixed limit on successful referral rewards; however, all
            referrals must be genuine and verifiable.
          </li>
          <li>
            Fake, duplicate, misleading, or fraudulent referrals may be
            rejected.
          </li>
          <li>
            PG Near reserves the right to modify, suspend, or discontinue the
            referral program at any time.
          </li>
        </ul>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          7. Prohibited Activities
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Posting false or misleading information.</li>
          <li>Using the platform for illegal purposes.</li>
          <li>Attempting to harm or disrupt the platform.</li>
          <li>Submitting fake booking proofs or cashback claims.</li>
          <li>Creating fraudulent referrals or duplicate accounts.</li>
        </ul>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          8. Privacy & User Data
        </h2>

        <p className="text-gray-600">
          By using PG Near, you agree that we may collect and store limited user
          information such as contact details, booking proofs, referral details,
          and communication records for verification, support, and platform
          improvement purposes. We do not sell personal user data to third
          parties.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          9. Listing Removal & Suspension
        </h2>

        <p className="text-gray-600">
          PG Near reserves the right to remove, suspend, or edit any listing
          that contains false information, inappropriate content, spam, or
          violates our platform policies.
        </p>

        {/* Section 10 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          10. Third-Party Interactions
        </h2>

        <p className="text-gray-600">
          Any agreements, payments, or disputes between users and PG owners are
          handled directly between the involved parties. PG Near is not
          responsible for third-party actions, behavior, or transactions.
        </p>

        {/* Section 11 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          11. Cashback & Referral Reward Processing
        </h2>

        <p className="text-gray-600">
          Cashback and referral rewards may take up to 14 days to process after
          successful verification with the PG owner. Processing timelines may
          vary depending on booking confirmation and verification requirements.
        </p>

        {/* Section 12 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          12. Limitation of Liability
        </h2>
        <p className="text-gray-600">
          PG Near is not responsible for any loss, damage, disputes, or issues
          arising from interactions, agreements, or transactions between users
          and PG owners.
        </p>

        {/* Section 13 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          13. Platform Content
        </h2>

        <p className="text-gray-600">
          The PG Near name, branding, website design, content, images, and
          platform materials may not be copied, reproduced, distributed, or
          misused without permission.
        </p>

        {/* Section 14 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          14. Changes to Terms
        </h2>
        <p className="text-gray-600">
          We may update these terms at any time. Continued use of the platform
          after any changes constitutes acceptance of the updated terms.
        </p>

        {/* Section 15 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
          15. Contact
        </h2>
        <p className="text-gray-600">
          If you have any questions regarding these terms, cashback claims,
          referral rewards, booking verification, or platform usage, please
          contact us on WhatsApp at{" "}
          <span className="font-medium">+91 8709555934</span>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
