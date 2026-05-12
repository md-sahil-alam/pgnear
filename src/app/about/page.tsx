// src/app/about/page.tsx

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
export const metadata = {
  title: "About Md Sahil Alam | PG Near Presidency University Bangalore",
  description:
    "Learn how PG Near helps students find PG near Presidency University Bangalore with verified listings, clear pricing, and direct contact without brokers.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Find PG Near Presidency University Bangalore
            </h1>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-500 leading-tight mt-2 ">
              Built for the Students, By the Students
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Hi, I’m{" "}
              <span className="font-semibold text-gray-900">Md Sahil Alam</span>
              . I built{" "}
              <span className="font-semibold text-gray-900">pgnear.in</span> to
              make finding PG near Presidency University Bangalore simple,
              clear, and stress-free.
            </p>
          </div>

          {/* Image Grid */}

          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="grid gap-4 first">
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920746/sahil_photo_cxcxmw.jpg"
                alt="Md Sahil Alam founder of PG Near platform"
                width={300}
                height={300}
                className="rounded-xl object-cover"
              />
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920694/Md-Sahil-Alam_uvezpg.jpg"
                alt="Md Sahil Alam software developer Bangalore"
                width={300}
                height={300}
                className="rounded-xl object-cover"
              />
            </div>

            <div className="grid gap-4  mt-8 second ">
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920694/md-sahil-alam-sofware-developer_papiav.jpg"
                alt="PG Near founder Md Sahil Alam "
                width={300}
                height={300}
                className="rounded-xl object-cover"
              />
              <Image
                src="https://res.cloudinary.com/dd1rxc66q/image/upload/v1777920694/Md-Sahil-Alam-Software-engeener_vr6eyb.jpg"
                alt="Md Sahil Alam Bangalore enfeener"
                width={300}
                height={300}
                className="rounded-xl h-75 object-cover "
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why I Built PG Near
        </h2>

        <div className="space-y-5 text-gray-600 leading-relaxed">
          <p>
            When I was searching for a PG near Presidency University Bangalore,
            the process was honestly frustrating.
          </p>

          <p>
            I used Google Maps to find PGs, but most information was outdated.
            Contact numbers didn’t work, and finding the right place meant
            calling multiple people again and again.
          </p>

          <p>
            The market was completely unorganised. There was no reliable place
            to compare options, no trust, and keeping track of contacts was
            exhausting.
          </p>

          <p>
            That’s when I realised this isn’t just my problem every student goes
            through this.
          </p>

          <p className="font-medium text-gray-900">
            So I decided to build PG Near , a platform that makes finding a PG
            simple, transparent, and reliable.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What PG Near Does
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            PG Near helps students find PG near Presidency University Bangalore
            with clear pricing, real details, and direct contact with owners
            without brokers or confusion.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10 text-left">
            <div className="p-6 border rounded-xl bg-white hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">No Brokers</h3>
              <p className="text-sm text-gray-600">
                Contact PG owners directly without paying extra commission.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-white hover:shadow-md transition">
              <div className="flex gap-2.5">
                <Heart className="text-red-500 mt-1" size={18} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  save time & reduce stress
                </h3>
              </div>

              <p className="text-gray-600 text-sm">
                Save pgs in your <span className="font-bold ">wishlist</span> to
                view them later and make an informed decision without the rush.
              </p>
            </div>

            <div className="p-6 border rounded-xl bg-white hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">
                Verified Listings
              </h3>
              <p className="text-sm text-gray-600">
                Only genuine PGs listed to save your time and effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Vision</h2>

        <p className="text-gray-600 leading-relaxed">
          My goal is to make pgnear.in the go-to platform for students across
          India starting with becoming the most reliable platform for finding PG
          near Presidency University Bangalore.
        </p>

        <p className="text-gray-900 font-medium mt-4">
          This is just the beginning.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Find PG Near Presidency University Bangalore
        </h2>

        <p className="mb-6 text-blue-100">
          Explore verified PG listings with clear pricing and direct contact.
        </p>

        <Link
          href="/pg-near-presidency-university"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Browse PGs
        </Link>
      </section>

      <Footer />
    </div>
  );
}
