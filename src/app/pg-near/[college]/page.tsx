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
  params: Promise<{ college: string }>;
}): Promise<Metadata> {
  const { college } = await params;

  const collegeData = colleges[college as keyof typeof colleges];

  if (!collegeData) {
    return {};
  }

  return {
    title: collegeData.title,
    description: collegeData.description,
    openGraph: {
      title: collegeData.title,
      description: collegeData.description,
      url: `https://pgnear.in/pg-near/${college}`,
      siteName: "PG Near",
      type: "website",
    },
    alternates: {
      canonical: `https://pgnear.in/pg-near/${college}`,
    },
  };
}

export default async function CollegePage({
  params,
}: {
  params: Promise<{ college: string }>;
}) {
  const { college } = await params;

  const collegeData = colleges[college as keyof typeof colleges];

  if (!collegeData) {
    notFound();
  }

  await connectDB();

  const LIMIT = 10;

  const listings = await Listing.find({
    "nearCollege.college": college,
    isActive: true,
  })
    .select(
      "title slug images isVerified twoSharingprice threeSharingprice address amenities gender distanceFromUni",
    )
    .sort({ isVerified: -1 })
    .limit(LIMIT)
    .lean();

  return (
    <>
      <CollegeListingsPage
        title={collegeData.title}
        description={collegeData.description}
        collegeName={collegeData.name}
        college={college}
        listings={JSON.parse(JSON.stringify(listings))}
      />
    </>
  );
}
