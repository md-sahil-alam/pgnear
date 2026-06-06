import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    await connectDB();
    const post = await BlogPost.findOne({ slug, published: true });

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The blog post you are looking for does not exist.",
      };
    }

    return {
      title: `${post.title} | PG Near Blog`,
      description: post.excerpt,
      keywords: [...post.tags, "PG", "Presidency University"],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://pgnear.in/blog/${post.slug}`,
        type: "article",
      },
      alternates: {
        canonical: `https://pgnear.in/blog/${post.slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Read our latest blog post",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const post = await BlogPost.findOne({ slug, published: true });

  if (!post) {
    notFound();
  }

  const serializedPost = JSON.parse(JSON.stringify(post));

  // Schema markup for Article
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: serializedPost.title,
    description: serializedPost.excerpt,
    image: serializedPost.image || "https://pgnear.in/og-image.jpg",
    datePublished: serializedPost.createdAt,
    dateModified: serializedPost.updatedAt,
    author: {
      "@type": "Organization",
      name: serializedPost.author,
    },
    publisher: {
      "@type": "Organization",
      name: "PG Near",
      logo: {
        "@type": "ImageObject",
        url: "https://pgnear.in/logo.png",
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Back Link */}
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
            ← Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-blue-600 uppercase px-3 py-1 bg-blue-50 rounded">
                {serializedPost.category}
              </span>
              <span className="text-sm text-gray-500">
                {serializedPost.readingTime} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {serializedPost.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {serializedPost.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 pb-6 border-b">
              <div>
                <strong>By {serializedPost.author}</strong>
                {" • "}
                {new Date(serializedPost.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {serializedPost.image && (
            <img
              src={serializedPost.image}
              alt={serializedPost.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: serializedPost.content }}
              className="text-gray-800 leading-relaxed space-y-6"
            />
          </div>

          {/* Tags */}
          {serializedPost.tags?.length > 0 && (
            <div className="mb-12 pb-12 border-b">
              <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex gap-2 flex-wrap">
                {serializedPost.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to find your perfect PG?
            </h3>
            <p className="text-gray-600 mb-6">
              Browse verified PG listings near Presidency University with clear
              pricing and direct owner contact.
            </p>
            <Link href="/pg-near-presidency-university">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
                Browse Listings →
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
