import { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";
import { colleges } from "@/lib/college";
import { notFound } from "next/navigation";
import CollegeListingsPage from "@/components/CollegeListingsPage";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    college: string;
    gender: string;
  }>;
}): Promise<Metadata> {
  const { college, gender } = await params;

  const collegeData = colleges[college as keyof typeof colleges];

  if (!collegeData || !["boys", "girls"].includes(gender)) {
    return {};
  }

  const genderText = gender === "girls" ? "Girls PG" : "Boys PG";

  return {
    title: `${genderText} Near ${collegeData.name}`,
    description: `Find verified ${genderText.toLowerCase()} accommodations near ${collegeData.name}.`,
    openGraph: {
      title: `${genderText} Near ${collegeData.name}`,
      description: `Find verified ${genderText.toLowerCase()} accommodations near ${collegeData.name}.`,
      url: `https://pgnear.in/pg-near/${college}/${gender}`,
      siteName: "PG Near",
      type: "website",
    },
    alternates: {
      canonical: `https://pgnear.in/pg-near/${college}/${gender}`,
    },
  };
}

export default async function GenderPage({
  params,
}: {
  params: Promise<{
    college: string;
    gender: string;
  }>;
}) {
  const { college, gender } = await params;

  const collegeData = colleges[college as keyof typeof colleges];

  if (!collegeData) {
    notFound();
  }

  if (!["boys", "girls"].includes(gender)) {
    notFound();
  }

  await connectDB();

  const listings = await Listing.find({
    "nearCollege.college": college,
    isActive: true,
    $or: [{ gender }, { gender: "all" }],
  })
    .sort({ isVerified: -1 })
    .lean();

  return (
    <CollegeListingsPage
      title={`${
        gender === "girls" ? "Girls PG Near" : "Boys PG Near"
      } ${collegeData.name}`}
      description={`Browse verified ${
        gender === "girls" ? "girls" : "boys"
      } PG accommodations near ${
        collegeData.name
      } with transparent pricing and direct owner contact.`}
      collegeName={collegeData.name}
      college={college}
      gender={gender}
      listings={JSON.parse(JSON.stringify(listings))}
    />
  );
}
