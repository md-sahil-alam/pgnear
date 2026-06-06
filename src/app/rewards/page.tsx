import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "PG Cashback & Refer & Earn | PG Near",
  description:
    "Get up to ₹500 cashback on PG bookings and earn up to ₹200 by referring friends. Available on all PGs listed on PG Near.",
  keywords: [
    "PG cashback",
    "PG referral program",
    "PG Near rewards",
    "student cashback",
    "PG booking cashback",
    "refer and earn",
    "Presidency University PG",
  ],
};

const whatsappLink = "https://wa.me/918709555934";

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
              🎉 Rewards Program
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Get Up to ₹500 Cashback
              <span className="block text-emerald-600 font-bold text-5xl mt-3">
                On Every PG Booking
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Book any PG listed on PG Near, submit your booking proof, and get
              rewarded.<br></br> Refer friends and earn even more.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={whatsappLink}
                target="_blank"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-white font-semibold hover:bg-black transition">
                Claim on WhatsApp
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 hover:bg-gray-50 transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Cashback Reward
            </h2>

            <p className="text-5xl font-bold text-blue-600 mb-4">Up to ₹500</p>

            <p className="text-gray-600">
              Successfully book a PG through PG Near, verify your booking, and
              receive cashback directly to your account.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Refer & Earn
            </h2>

            <p className="text-5xl font-bold text-emerald-600 mb-4">
              Up to ₹200
            </p>

            <p className="text-gray-600">
              Refer a friend to PG Near. If they successfully book a PG and the
              booking is verified, you may receive a referral reward.
            </p>
          </div>
        </div>
      </section>

      {/* How Cashback Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How Cashback Works
          </h2>

          <p className="text-gray-600 mt-4">Claiming your reward is simple.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Book a PG",
              desc: "Choose and book any PG listed on PG Near.",
            },
            {
              step: "02",
              title: "Send Proof",
              desc: "Share your booking receipt or payment proof on WhatsApp.",
            },
            {
              step: "03",
              title: "Verification",
              desc: "We verify your booking with the PG owner.",
            },
            {
              step: "04",
              title: "Get Cashback",
              desc: "Receive up to ₹500 after successful verification.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-gray-200 p-6">
              <div className="text-blue-600 font-bold text-sm mb-3">
                STEP {item.step}
              </div>

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <h5 className="text-xl font-bold  mt-12 mb-2 text-rose-500">
          *Note (Important)
        </h5>
        <p>
          {" "}
          WhatsApp message to PG Owner should should be in the format provided
          by PG Near for ease of verification.
        </p>
        <h5 className="text-xl font-bold text-emerald-700 mt-12 mb-2">
          *Example WhatsApp message to PG Owner
        </h5>
        <p>
          Hi, I'm (your name). I found your PG on pgnear.in and I'm interested
          in your PG. Is it available?
        </p>
      </section>

      {/* Refer & Earn */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Refer & Earn
            </h2>

            <p className="text-gray-600 mt-4">
              Help your friends find a PG and earn rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Refer a Friend",
                desc: "Tell your friend about PG Near.",
              },
              {
                step: "02",
                title: "Friend Books",
                desc: "Your friend books a PG listed on PG Near.",
              },
              {
                step: "03",
                title: "Verification",
                desc: "During verification, your friend provides your name and phone number.",
              },
              {
                step: "04",
                title: "Earn Reward",
                desc: "Receive up to ₹200 after successful verification.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-emerald-600 font-bold text-sm mb-3">
                  STEP {item.step}
                </div>

                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility</h2>

          <ul className="space-y-4 text-gray-700">
            <li>✅ All PGs listed on PG Near are eligible.</li>
            <li>✅ Valid booking proof is required.</li>
            <li>✅ Verification with the PG owner is required.</li>
            <li>✅ Cashback and referral rewards may take up to 14 days.</li>
            <li>
              ✅ Users can claim rewards for multiple successful bookings.
            </li>
            <li>
              ✅ The referrer identified by the booked student during
              verification will be considered the valid referrer.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "How do I claim cashback?",
              a: "After booking a PG, send your booking proof on WhatsApp. We will verify the booking with the PG owner and process your reward.",
            },
            {
              q: "When will I receive my cashback?",
              a: "Cashback and referral rewards may take up to 14 days after successful verification.",
            },
            {
              q: "What proof is required?",
              a: "Typically a payment receipt, booking confirmation, or any valid booking proof requested during verification.",
            },
            {
              q: "Are all PGs eligible?",
              a: "Yes. All PGs listed on PG Near are eligible, subject to successful booking verification.",
            },
            {
              q: "Can I earn referral rewards multiple times?",
              a: "Yes. There is no fixed limit on successful referrals, provided each booking is genuine and verified.",
            },
            {
              q: "What if multiple people claim the same referral?",
              a: "The referrer identified by the booked student during verification will be considered the valid referrer.",
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {faq.q}
              </h3>

              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="rounded-3xl bg-gradient-to-b from-emerald-700 to-emerald-500 p-10 text-center text-white shadow-lg ">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Claim Your Reward?
          </h2>

          <p className="text-lg opacity-90 mb-8">
            Send your booking proof and claim your cashback today.
          </p>

          <Link
            href={whatsappLink}
            target="_blank"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-gray-900 hover:bg-gray-100 transition">
            WhatsApp: +91 8709555934
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
