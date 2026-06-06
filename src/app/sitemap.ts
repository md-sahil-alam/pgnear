import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Listing from "@/models/Listing";

const BASE_URL = "https://www.pgnear.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB();

    const listings = await Listing.find({ isActive: true })
      .select("slug updatedAt createdAt")
      .lean();

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${BASE_URL}/pg-near-presidency-university`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/privacy`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/rewards`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
    ];

    const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
      url: `${BASE_URL}/listing/${listing.slug}`,
      lastModified: new Date(listing.updatedAt || listing.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...listingPages];
  } catch (error) {
    console.error("Sitemap generation error:", error);

    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${BASE_URL}/pg-near-presidency-university`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}