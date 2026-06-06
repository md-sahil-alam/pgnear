import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import Listing from '@/models/Listing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB();

    // Get all active listings
    const listings = await Listing.find({ isActive: true })
      .select('slug updatedAt createdAt')
      .lean();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: 'https://pgnear.in',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: 'https://pgnear.in/pg-near-presidency-university',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: 'https://pgnear.in/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: 'https://pgnear.in/privacy',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: 'https://pgnear.in/terms',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ];

    // Dynamic listing pages
    const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
      url: `https://pgnear.in/listing/${listing.slug}`,
      lastModified: new Date(listing.updatedAt || listing.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...listingPages];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return at least static pages if database fails
    return [
      {
        url: 'https://pgnear.in',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: 'https://pgnear.in/pg-near-presidency-university',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}
