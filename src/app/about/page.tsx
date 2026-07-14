import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Users,
  MessageCircleMore,
  MoveDown,
} from "lucide-react";

export const metadata = {
  title: "About PG Near | Verified PGs Near Presidency & REVA University",
  description:
    "Learn how Md Sahil Alam built PG Near to help students find verified PGs near Presidency University and REVA University with transparent pricing, direct owner contact, and no brokers.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO / FOUNDER INTRO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 md:pt-16">
        <div className="grid md:grid-cols-2 gap-10 items-center ">
          {/* Images */}
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4 max-w-md mx-auto md:max-w-none">
            <div className="grid ">
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920746/sahil_photo_cxcxmw.jpg"
                alt="Md Sahil Alam founder of PG Near "
                width={300}
                height={300}
                className="rounded-2xl object-cover w-full h-[220px] md:h-[250px] hidden md:block"
              />
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920694/Md-Sahil-Alam_uvezpg.jpg"
                alt="Md Sahil Alam software developer Bangalore"
                width={300}
                height={300}
                className="rounded-2xl object-cover w-full h-[220px] md:h-[250px] "
              />
            </div>

            <div className="flex  md:grid gap-4 mt-6">
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920694/md-sahil-alam-sofware-developer_papiav.jpg"
                alt="PG Near founder Md Sahil Alam"
                width={300}
                height={300}
                className="rounded-2xl object-cover w-full h-[220px] md:h-[250px] hidden md:block"
              />
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1781519306/IMG_20260608_010035_582Md%20Sahil%20Alam%20Founder%20Of%20PG%20Near.webp"
                alt="Md Sahil Alam founder of PG Near"
                width={300}
                height={300}
                className="rounded-2xl object-cover w-full h-[220px] md:h-[250px]"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 md:order-1 ">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mt-3">
              Hi, this is Md Sahil Alam
            </h1>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed">
              Founder of PG Near, and I built this platform after facing the
              same problem many students face when they move to Bangalore for
              college: finding a PG that feels trustworthy, has clear pricing,
              and is worth the money.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#story"
                className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2 ">
                Story
                <MoveDown size={16} />
              </a>

              <Link
                href="https://mdsahilalam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition">
                More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-4xl mx-auto px-4 py-16 " id="story">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why I Built <span className="text-blue-600">PG Near</span>
        </h2>

        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>
            Moving to a new city for college is exciting but it can also be
            overwhelming.
          </p>

          <p>
            When I first arrived in Bangalore, I had nowhere to stay. I
            eventually found a PG, but only on the evening of the day I arrived.
            Until then, I spent hours calling more than 10 PG owners, trying to
            compare rent, amenities, locations, and availability.
          </p>

          <p>
            Everything was scattered. I had Google Maps open in one tab,
            WhatsApp chats in another, and handwritten notes just to remember
            which PG offered what. It wasn't just time-consuming, it was
            exhausting.
          </p>

          <p>
            What made the experience even more stressful was the lack of trust.
            Every conversation left me wondering:
          </p>

          <div className="bg-gray-50 border-l-4 border-blue-600 rounded-r-xl p-6">
            <ul className="space-y-3 text-gray-700">
              <li>• Is this listing even genuine?</li>
              <li>• Will the rent change when I visit?</li>
              <li>• Are the photos actually recent?</li>
              <li>
                • What if I travel all the way there and the PG isn't what was
                promised?
              </li>
            </ul>
          </div>

          <p>
            I had no local contacts, no recommendations, and no reliable
            platform I could trust. Like thousands of students moving to
            Bangalore every year, I was figuring everything out on my own.
          </p>

          <p>
            That's when I realized the problem wasn't just finding a PG, it was
            the entire experience. The market was highly unorganized, and
            students were forced to depend on random WhatsApp groups, outdated
            Google Maps listings, and word of mouth.
          </p>

          <p>I kept thinking:</p>

          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
            <p className="text-lg italic text-gray-800">
              "Booking a hotel is easy. Ordering food is easy. Booking a cab is
              easy. But finding a trustworthy PG near your college still feels
              confusing and stressful. Why?"
            </p>
          </div>

          <p>
            That question became the foundation of <strong>PG Near</strong>.
          </p>

          <p>But I didn't want to build just another listing website.</p>

          <p className="font-semibold text-gray-900">
            I wanted to build a platform that I personally would have trusted
            when I arrived in Bangalore.
          </p>

          <p>
            That's why PG Near doesn't list every PG. Every property is reviewed
            against our quality standards before it's published. Students can
            compare verified options, view real photos, check transparent
            pricing, contact owners directly without brokers, and even receive
            cashback rewards on eligible bookings.
          </p>

          <div className="rounded-2xl bg-gray-900 text-white p-8">
            <p className="text-xl font-semibold">
              Built for the students, by a student.
            </p>

            <p className="mt-3 text-gray-300 leading-relaxed">
              Sometimes the best startups aren't born from brilliant
              ideas—they're born from problems you experience yourself.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM + SOLUTION */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-8 border rounded-2xl bg-white hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                The Problem
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Students moving to a new city often have to deal with outdated
                listings, missing prices, unreliable contact numbers, brokers,
                and PGs that look very different from their photos. It wastes
                time and creates a lot of stress during an already busy stage of
                life.
              </p>
            </div>

            <div className="p-8 border rounded-2xl bg-white hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                The Solution
              </h2>
              <p className="text-gray-600 leading-relaxed">
                PG Near helps students discover the best verified PG
                accommodations near the universities we serve with clear
                pricing, direct owner contact, photos, amenities, and useful
                details to make a better decision faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What PG Near Does
            </h2>
            <p className="text-gray-600 text-lg">
              PG Near helps students find verified PG accommodations near the
              universities we serve, with transparent information and direct
              contact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="p-6 border rounded-2xl bg-white hover:shadow-md transition">
              <ShieldCheck className="text-blue-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-900 mb-2">Quality Only</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We do not list every PG. Only properties that meet our standards
                make it onto the platform.
              </p>
            </div>

            <div className="p-6 border rounded-2xl bg-white hover:shadow-md transition">
              <MessageCircleMore className="text-blue-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-900 mb-2">
                Direct Contact
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Students can contact owners directly without brokers getting in
                the way.
              </p>
            </div>

            <div className="p-6 border rounded-2xl bg-white hover:shadow-md transition">
              <Users className="text-blue-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-900 mb-2">
                Student First
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The platform is built around what students actually need: honest
                details, price clarity, and location convenience.
              </p>
            </div>

            <div className="p-6 border rounded-2xl bg-white hover:shadow-md transition">
              <Heart className="text-red-500 mb-3" size={28} />
              <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Browse verified options faster, shortlist better PGs, and avoid
                wasting time on poor-quality places.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USP SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="rounded-3xl border bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our USP
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            PG Near is different because we focus on{" "}
            <span className="font-semibold text-gray-900">
              quality over quantity
            </span>
            . Every PG is checked against our listing criteria before it is
            published. If a property does not meet those standards, we do not
            list it.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8 text-sm text-gray-600">
            <ul className="space-y-3">
              <li>• Good Google rating and genuine reviews</li>
              <li>• Safe and student-friendly environment</li>
              <li>• Transparent pricing</li>
              <li>• Clean rooms and maintained facilities</li>
            </ul>
            <ul className="space-y-3">
              <li>• Essential amenities</li>
              <li>• Responsive management</li>
              <li>• Direct owner or manager contact</li>
              <li>• Suitable location near the university</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CURRENT FOCUS */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Currently Serving
          </h2>
          <p className="text-gray-600 text-lg">
            Right now, PG Near is focused on helping students near:
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border">
              <p className="text-xl font-semibold text-gray-900">
                Presidency University
              </p>
              <Link
                href="/pg-near/presidency-university"
                className="text-blue-600 text-sm font-medium mt-2 inline-block">
                View PGs near Presidency University →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border">
              <p className="text-xl font-semibold text-gray-900">
                REVA University
              </p>
              <Link
                href="/pg-near/reva-university"
                className="text-blue-600 text-sm font-medium mt-2 inline-block">
                View PGs near REVA University →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Vision</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          My goal is to make PG Near the most trusted platform for students
          searching for PGs near their college. We are starting with Presidency
          University and REVA University, and building from there with the same
          quality-first approach.
        </p>
        <p className="text-gray-900 font-medium mt-4">
          This is just the beginning.
        </p>
      </section>

      <Footer />
    </div>
  );
}
