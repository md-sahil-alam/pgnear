import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Heart,
  MapPin,
  BadgeCheck,
  Gift,
  ShieldCheck,
  Star,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import HomeListings from "@/components/HomeListings";
import { Metadata } from "next";
import ReferralPopup from "@/components/ui/ReferralPopup";
import { colleges } from "@/lib/college";

// Revalidate every 60 seconds to pick up new/deleted listings
export const revalidate = 60;

export const metadata: Metadata = {
  title: "PG Near | Verified PGs Near Presidency & REVA University Bangalore",
  description:
    "Find verified PG accommodations near Presidency University and REVA University Bangalore. Compare rent, amenities, photos, and contact PG owners directly. No brokers.",
  keywords: [
    "PG Near",
    "PG near Presidency University",
    "Best PG near Presidency University",
    "PG near REVA University",
    "Best PG near REVA University",
    "Girls PG near Presidency University",
    "Boys PG near Presidency University",
    "Girls PG near REVA University",
    "Boys PG near REVA University",
    "Student accommodation Bangalore",
  ],
  openGraph: {
    title: "PG Near | Verified PG Near Presidency & REVA University",
    description:
      "Browse verified PG accommodations near Presidency University and REVA University with direct owner contact.",
    url: "https://www.pgnear.in",
    siteName: "PG Near",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pgnear.in",
  },
};

export default async function HomePage() {
  await connectDB();

  const universitySlugs = Object.keys(colleges);

  const listings = await Listing.find({
    isActive: true,
    "nearCollege.college": { $in: universitySlugs },
  })
    .sort({ createdAt: 1 })
    .lean();

  const serializedListings = JSON.parse(JSON.stringify(listings));

  const listingsByCollege = universitySlugs.reduce<Record<string, any[]>>(
    (acc, slug) => {
      acc[slug] = serializedListings
        .filter((listing: any) =>
          listing?.nearCollege?.some((entry: any) => entry?.college === slug),
        )
        .slice(0, 4);
      return acc;
    },
    {},
  );

  const universityCards = Object.entries(colleges).map(([slug, college]) => ({
    slug,
    ...college,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* <ReferralPopup rewardLink="/rewards" delayMs={6000} snoozeDays={7} /> */}
      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr]  lg:py-12 ">
        {/* 1. Image Div: Stays on top for mobile, moves to column 2 (right) on desktop */}
        <div className="relative min-h-60 lg:min-h-80 overflow-hidden lg:rounded-r-2xl lg:order-2 rounded-2xl bg-red border-white md:min-h-96 ">
          <img
            src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1782049217/pg-listings/wmuvxdvuqwx3yeipyj1h.jpg"
            alt="PGs near top universities in Bangalore"
            className="h-full w-full object-cover"
          />
          <div className="absolute h-full w-full inset-0 bg-linear-to-b  lg:bg-linear-to-l from-tranparent via-transparent to-white " />
        </div>

        {/* 2. Content Div: Stays at the bottom for mobile, moves to column 1 (left) on desktop */}

        <div className="flex flex-col justify-center md:order-1 bg-linear-to-t lg:bg-linear-to-r  from-blue-50 lg:from-slate-100 via-white to-white rounded-2xl md:rounded-l-2xl pt-3 pb-2 pl-2 lg:pl-4 ">
          <div className="mb-2 flex items-center gap-2 ">
            <a
              href="#validation"
              className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ">
              Best PGs only
            </a>
            <a
              href="/rewards"
              className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Cashback rewards
            </a>
          </div>
          <h1 className="mt-2 mb-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl ">
            Find best and verified PGs near Top universities in Bangalore
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Carefully selected just for you.{" "}
            <span className="font-semibold text-gray-700 ">
              We only list PGs we'd confidently stay in ourselves.
            </span>
          </p>
          {/* <p className="mt-4 text-md text-gray-600">
            Browse verified accommodations, compare options, contact owners
            directly, and enjoy cashback rewards after booking.
          </p> */}

          <p className="mt-6 tracking-wide text-sm font-medium italic text-gray-800">
            We did the hard work, so you don't have to.
          </p>

          {/* <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/pg-near-presidency-university">
              <Button size="lg">Explore Presidency PGs</Button>
            </Link>

            <details className="group relative">
              <summary className="cursor-pointer list-none rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600">
                Choose a university <ChevronDown />
              </summary>
              <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                {universityCards.map(({ slug, name }) => (
                  <Link
                    key={slug}
                    href={`/pg-near/${slug}`}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600">
                    {name}
                  </Link>
                ))}
              </div>
            </details>
          </div> */}

          <div className="mt-6 gap-3 mb-2 hidden md:block ">
            <p className="text-md font-semibold text-gray-700">
              Select your campuses
            </p>
            <div className="flex flex-row gap-2 mt-2 mr-2">
              {universityCards.map(({ slug, name }) => (
                <Link
                  key={slug}
                  href={`/pg-near/${slug}`}
                  className="rounded-xl border-2 border-gray-100 px-3 py-1.5 text-md text-gray-100 transition shadow-blue-300 hover:border-blue-200 hover:scale-105 shadow-md lg:shadow-lg bg-blue-600 hover:bg-blue-700 font-semibold ">
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*College card Section */}
      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="mb-6">
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Choose your campus and browse nearby PGs
          </h2>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {universityCards.map(({ slug, name, description, image }) => (
            <Link
              key={slug}
              href={`/pg-near/${slug}`}
              prefetch={true}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm
transition-all duration-150
hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg
active:scale-[0.98] active:shadow-sm">
              <img
                src={image}
                alt={name}
                className="h-40 w-full object-cover"
              />
              <div className="p-2 lg:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">
                      {name}
                    </h4>
                    <p className=" hidden md:block mt-2 text-sm text-gray-600">
                      {description}
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                  View listings →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-md font-medium text-blue-700">
              Why PG Near ?
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-emerald-600 underline decoration-emerald-600 decoration-2 underline-offset-4">
              We Don't List Every PG!
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Unlike other platforms, we don't focus on quantity. Every PG is
              reviewed before being listed so you can confidently choose the
              best place to stay.
            </p>
          </div>

          {/* USP Cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <a
              href="/rewards"
              className="rounded-3xl  bg-white p-7 shadow-gray-400 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start gap-2">
                <Gift className="mb-5 h-6 w-6 text-blue-800" />

                <h3 className="text-lg font-semibold">Cashback Rewards</h3>
              </div>

              <p className=" text-gray-600">
                Book through PG Near and receive cashback after successful
                move-in.
              </p>
              <p className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:underline">
                Learn more →
              </p>
            </a>

            <a
              href="/about"
              className="rounded-3xl  shadow-gray-400  bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start gap-2">
                <HeartHandshake className="mb-5 h-6 w-6 text-red-800" />

                <h3 className="text-lg font-semibold">Built by Students</h3>
              </div>

              <p className=" text-gray-600">
                Created by students who understand how stressful finding the
                right PG can be.
              </p>
              <p className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:underline">
                About us →
              </p>
            </a>

            <div
              id="validation"
              className="rounded-3xl  shadow-gray-400  bg-white p-7 shadow-sm ">
              <div className="flex items-start gap-2">
                <Star className="mb-5 h-6 w-6 text-yellow-600" />

                <h3 className="text-lg font-semibold">Only Best PGs</h3>
              </div>

              <p className=" text-gray-600">
                We shortlist only quality PGs that provide excellent student
                experience.
              </p>
            </div>

            <div className="rounded-3xl  shadow-gray-400  bg-white p-7 shadow-sm">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mb-5 h-6 w-6 text-emerald-600" />

                <h3 className="text-lg font-semibold">Strict Verification</h3>
              </div>

              <p className=" text-gray-600">
                Every listed PG satisfies our quality standards before appearing
                on PG Near.
              </p>
            </div>
          </div>

          <details className="mt-8 group">
            <summary className=" flex cursor-pointer list-none items-center justify-between rounded-2xl border border-gray-200 bg-white  px-5 py-4 font-semibold text-gray-900 transition  w-80 m-auto">
              <BadgeCheck className="h-8 w-8 text-blue-600" />
              <span>Our Verification Criteria</span>

              <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
            </summary>

            <div className="mt-5 grid  gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-white rounded-2xl p-6  ">
              {[
                "4+ Google Rating",
                "20+ Genuine Reviews",
                "Good Amenities",
                "Direct Owner Contact",
                "Student Friendly",
                "Safe Environment",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-emerald-100/20 p-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-700 text-center">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* Listings Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">PG Listings:</h2>
          </div>
        </div>

        <div className="space-y-10 ">
          {universityCards.map(({ slug, name }) => (
            <div
              key={slug}
              className="rounded-[1.75rem] border border-gray-100 bg-blue-50/40 p-4 sm:p-6">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  {/* <h3 className="text-2xl font-semibold text-gray-900">
                    {name}
                  </h3> */}
                  <p className="text-md font-bold ">Best PGs near {name}</p>
                </div>

                <Link
                  href={`/pg-near/${slug}`}
                  className="text-sm font-semibold text-blue-600 hover:underline">
                  View all →
                </Link>
              </div>

              {listingsByCollege[slug]?.length ? (
                <HomeListings listings={listingsByCollege[slug]} />
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-gray-500">
                  Listings for {name} will be added soon.
                </div>
              )}

              {listingsByCollege[slug]?.length ? (
                <Link
                  key={slug}
                  href={`/pg-near/${slug}`}
                  className="rounded-xl border border-blue-100 bg-white px-3 py-4 text-sm font-medium transition hover:border-blue-200 hover:text-blue-600 m-auto block mt-7 text-center w-1/2 shadow-md shadow-blue-200 hover:shadow-lg">
                  View all best PGs →
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* feature Section */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Built for the Students, By the Students
            </h2>
            <p className="mx-auto  max-w-2xl text-gray-600">
              We understand what matters when choosing a PG because we’ve been
              through it ourselves.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Direct Contact
              </h3>
              <p className="text-sm text-gray-600">
                Talk directly to PG owners. No middlemen, no commission.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
              <div className="flex gap-2.5">
                <Heart className="mt-1 text-red-500" size={18} />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Save time and reduce stress
                </h3>
              </div>

              <p className="text-sm text-gray-600">
                Save PGs in your <span className="font-bold">wishlist</span> to
                view them later and make an informed decision without the rush.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Verified Listings
              </h3>
              <p className="text-sm text-gray-600">
                Only genuine PGs are listed so you can save time and effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
