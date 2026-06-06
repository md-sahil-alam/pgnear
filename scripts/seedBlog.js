#!/usr/bin/env node

/**
 * Seed script to add sample blog posts to MongoDB
 * Usage: node scripts/seedBlog.js
 */

const sampleBlogPosts = require('./sampleBlogPosts');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pgnear';

// BlogPost schema
const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'PG Near Team' },
    category: {
      type: String,
      enum: ['guide', 'location', 'faq', 'comparison', 'review'],
      default: 'guide',
    },
    tags: [String],
    image: { type: String },
    readingTime: { type: Number, default: 5 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

async function seedBlog() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB');

    // Clear existing posts
    const deleted = await BlogPost.deleteMany({ author: 'PG Near Team' });
    console.log(` Deleted ${deleted.deletedCount} existing posts`);

    // Insert sample posts
    const result = await BlogPost.insertMany(sampleBlogPosts);
    console.log(`Added ${result.length} blog posts`);

    // Show summary
    console.log('\n Blog Posts Added:');
    result.forEach((post) => {
      console.log(`  • ${post.title} (${post.category})`);
    });

    console.log('\n✅ Blog seeding completed successfully!');
    console.log('Visit: https://your-domain.com/blog to see the blog');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding blog:', error.message);
    process.exit(1);
  }
}

seedBlog();
