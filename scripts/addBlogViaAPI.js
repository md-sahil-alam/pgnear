#!/usr/bin/env node

/**
 * Add blog posts via API instead of direct MongoDB connection
 * No MongoDB required locally - uses your running application's API
 * Usage: node scripts/addBlogViaAPI.js
 */

const http = require('http');
const https = require('https');

// Blog posts to add
const blogPosts = [
  {
    title: "How to Find the Perfect PG Near Presidency University Bangalore",
    slug: "how-to-find-perfect-pg-near-presidency-university",
    excerpt: "A comprehensive guide to finding the ideal PG accommodation near Presidency University with tips on pricing, amenities, and location selection.",
    content: `<h2>Introduction</h2><p>Finding a PG near Presidency University Bangalore can be overwhelming with so many options available. This guide walks you through every step of the process to help you make an informed decision.</p><h2>1. Determine Your Budget</h2><p>The first step is understanding how much you can spend monthly. PG prices near Presidency University typically range from ₹8,000 to ₹25,000 depending on sharing type and amenities.</p>`,
    author: "PG Near Team",
    category: "guide",
    tags: ["PG near Presidency University", "accommodation", "student housing", "tips"],
    readingTime: 8,
    published: true,
  },
  {
    title: "Single Room PG Near Presidency University - Complete Guide",
    slug: "single-room-pg-near-presidency-university",
    excerpt: "Get complete information about single room (1-sharing) PGs near Presidency University - pricing, amenities, best areas, and tips for finding the perfect private space.",
    content: `<h2>Why Choose a Single Room PG?</h2><p>A single room (1-sharing) PG is the ultimate choice for students who value privacy, independence, and personal space.</p><h2>Pricing - What to Expect</h2><p>Average Single Room PG Prices Near Presidency University: Dibbur: ₹18,000 - ₹25,000/month, Rajanakunte: ₹12,000 - ₹18,000/month</p>`,
    author: "PG Near Team",
    category: "guide",
    tags: ["1-sharing", "single room", "private PG", "student accommodation", "privacy"],
    readingTime: 11,
    published: true,
  },
  {
    title: "Best Female PGs Near Presidency University Bangalore",
    slug: "best-female-pg-near-presidency-university-bangalore",
    excerpt: "Complete guide to finding the safest and best female PGs near Presidency University Bangalore - security features, amenities, pricing, and top neighborhoods.",
    content: `<h2>Why Female-Only PGs?</h2><p>Female PGs near Presidency University Bangalore are specifically designed to provide a safe, supportive, and community-oriented living space for women students.</p><h2>Safety Features - What to Look For</h2><p>Essential Security Measures: 24/7 Female Warden, CCTV Cameras, Restricted Entry, Visitor Log</p>`,
    author: "PG Near Team",
    category: "guide",
    tags: ["female PG", "girls hostel", "safety", "women accommodation", "Bangalore"],
    readingTime: 13,
    published: true,
  },
];

async function addBlogPostsViaAPI(baseUrl) {
  console.log(`\n Adding blog posts via API...`);
  console.log(`Target: ${baseUrl}/api/blog\n`);

  // First, check if server is running
  try {
    console.log('Checking if server is running...');
    const testResponse = await makeRequest(baseUrl, '/api/blog', 'GET', null);
    console.log('✓ Server is running!\n');
  } catch (error) {
    console.error(` Cannot connect to ${baseUrl}`);
    console.error(`   Make sure your dev server is running: pnpm dev`);
    console.error(`   Error: ${error.message}\n`);
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const post of blogPosts) {
    try {
      const response = await makeRequest(baseUrl, '/api/blog', 'POST', post);
      
      if (response.success) {
        console.log(` ${post.title}`);
        successCount++;
      } else {
        console.log(`${post.title}`);
        console.log(`   Error: ${response.message || JSON.stringify(response)}`);
        failCount++;
      }
    } catch (error) {
      console.log(` ${post.title}`);
      console.log(`   Error: ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(` Added: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`\nVisit ${baseUrl}/blog to see your posts!`);
}

function makeRequest(baseUrl, path, method, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(baseUrl + path);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const protocol = url.protocol === 'https:' ? https : http;
    const req = protocol.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve(parsed);
        } catch (e) {
          reject(new Error(`Invalid JSON response: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Determine base URL based on environment
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

addBlogPostsViaAPI(baseUrl).catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
