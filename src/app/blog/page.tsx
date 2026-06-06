import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - PG Near Presidency University | Guides & Tips",
  description:
    "Read guides, tips, and articles about finding the perfect PG near Presidency University Bangalore. Expert advice for students.",
  keywords: [
    "PG guides",
    "Presidency University housing",
    "Student accommodation tips",
    "PG near Presidency",
  ],
  openGraph: {
    title: "PG Near Blog",
    description:
      "Guides and tips for finding PG accommodation near Presidency University",
    url: "https://pgnear.in/blog",
  },
  alternates: {
    canonical: "https://pgnear.in/blog",
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  await connectDB();
  const posts = await BlogPost.find({ published: true })
    .sort({ createdAt: -1 })
    .lean();

  const categoryCounts = {
    guide: posts.filter((p) => p.category === "guide").length,
    location: posts.filter((p) => p.category === "location").length,
    faq: posts.filter((p) => p.category === "faq").length,
    comparison: posts.filter((p) => p.category === "comparison").length,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PG Near Blog
            </h1>
            <p className="text-xl text-blue-100">
              Expert guides, tips, and insights for finding the perfect PG near
              Presidency University
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Categories */}
          <div className="mb-12 flex gap-4 flex-wrap">
            <Link href="/blog?category=guide">
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">
                Guides ({categoryCounts.guide})
              </div>
            </Link>
            <Link href="/blog?category=location">
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">
                Locations ({categoryCounts.location})
              </div>
            </Link>
            <Link href="/blog?category=faq">
              <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">
                FAQs ({categoryCounts.faq})
              </div>
            </Link>
            <Link href="/blog?category=comparison">
              <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition">
                Comparisons ({categoryCounts.comparison})
              </div>
            </Link>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    {/* Image */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 uppercase px-2 py-1 bg-blue-50 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readingTime} min read
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {post.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                      <div className="mt-4 text-blue-600 font-semibold text-sm hover:text-blue-700">
                        Read More →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
