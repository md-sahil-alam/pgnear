#!/usr/bin/env node

/**
 * Updated Seed script - Adds ALL blog posts including new high-intent posts
 * Usage: node scripts/seedBlogAll.js
 */

const sampleBlogPosts = require('./sampleBlogPosts');
const additionalBlogPosts = require('./additionalBlogPosts');
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
    console.log('✓ Connected to MongoDB');

    // Combine all posts
    const allPosts = [...sampleBlogPosts, ...additionalBlogPosts];

    // Clear existing posts
    const deleted = await BlogPost.deleteMany({ author: 'PG Near Team' });
    console.log(`✓ Cleared ${deleted.deletedCount} existing posts`);

    // Insert all posts
    const result = await BlogPost.insertMany(allPosts);
    console.log(`✓ Added ${result.length} blog posts total`);

    // Show summary by category
    console.log('\n📰 Blog Posts Added (by Category):');
    const byCategory = {};
    result.forEach((post) => {
      if (!byCategory[post.category]) byCategory[post.category] = [];
      byCategory[post.category].push(post.title);
    });

    Object.entries(byCategory).forEach(([category, posts]) => {
      console.log(`\n${category.toUpperCase()}:`);
      posts.forEach((title) => {
        console.log(`  • ${title}`);
      });
    });

    console.log('\n✅ Blog seeding completed successfully!');
    console.log('Visit: https://pgnear.in/blog to see the blog');

    // Show high-intent keyword targeting
    console.log('\n🎯 High-Intent Keywords Targeted:');
    console.log('  • "single room pg near presidency university"');
    console.log('  • "pg near presidency university bangalore for female"');
    console.log('  • "best female pg bangalore"');

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error seeding blog:', error.message);
    process.exit(1);
  }
}

seedBlog();
