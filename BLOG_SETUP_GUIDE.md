# Blog Setup Guide - PG Near

This guide explains how to set up and manage the blog for your PG Near website.

## 📂 What's Been Created

### New Folders & Files:
```
/src/models/
  └── BlogPost.ts           # MongoDB schema for blog posts

/src/app/blog/
  ├── page.tsx              # Blog listing page
  └── [slug]/page.tsx       # Individual blog post pages

/src/app/api/blog/
  └── route.ts              # API endpoints for blog management

/scripts/
  ├── seedBlog.js           # Seed script to populate sample posts
  └── sampleBlogPosts.js    # Sample blog post content

Updated:
  └── /src/components/Navbar.tsx  # Added Blog link
```

## 🚀 Getting Started

### Step 1: Add Sample Blog Posts

Run this command to seed the database with 4 sample blog posts:

```bash
node scripts/seedBlog.js
```

**What this does:**
- Connects to your MongoDB database
- Deletes any existing sample posts (from PG Near Team)
- Inserts 4 new blog posts:
  1. "How to Find the Perfect PG" (guide)
  2. "Best Neighborhoods" (location)
  3. "Girls vs Boys PG" (comparison)
  4. "FAQ: 15 Questions" (faq)

### Step 2: View the Blog

Visit `https://pgnear.in/blog` to see the blog listing.

Each post includes:
- Category badge (guide, location, comparison, faq)
- Reading time estimate
- Excerpt
- Tags
- Link to full post

### Step 3: Start Writing Your Own Content

## 📝 Writing New Blog Posts

### Option A: Use the API

**POST** `/api/blog`

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Blog Title",
    "excerpt": "Brief summary of your post",
    "content": "<h2>HTML formatted content...</h2>",
    "category": "guide",
    "tags": ["keyword1", "keyword2"],
    "author": "Your Name",
    "image": "https://example.com/image.jpg",
    "published": true
  }'
```

**Required fields:**
- `title` (string) - Post title
- `excerpt` (string) - 1-2 sentence summary
- `content` (string) - HTML-formatted content
- `category` (enum) - One of: `guide`, `location`, `faq`, `comparison`, `review`
- `tags` (array) - Relevant keywords

**Optional fields:**
- `author` (string) - Author name (default: "PG Near Team")
- `image` (string) - Featured image URL
- `published` (boolean) - Set to false to create draft (default: true)

### Option B: Add Directly to Database (MongoDB Compass)

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `blogposts` collection
4. Click "Add Document"
5. Insert a new post with the same fields as above

### Option C: Edit Sample Posts

The sample posts in `/scripts/sampleBlogPosts.js` can be edited directly:

```javascript
{
  title: "Your New Title",
  slug: "your-new-title",  // Auto-generated from title
  excerpt: "Short summary",
  content: `<h2>HTML Content</h2>...`,
  author: "Your Name",
  category: "guide",
  tags: ["keyword1", "keyword2"],
  readingTime: 7,  // Estimated minutes to read
  published: true,
}
```

Then re-run: `node scripts/seedBlog.js`

## 📊 Content Best Practices for SEO

### Target Keywords
Focus on these high-value keywords:
- "PG near Presidency University"
- "Girls PG Bangalore"
- "Boys PG Bangalore"
- "Student accommodation Bangalore"
- "PG in Dibbur"
- "PG in Rajanakunte"

### Writing Tips

1. **Headlines (H2/H3)**: Use target keywords naturally
2. **Meta Description**: Keep excerpt under 160 characters
3. **Internal Linking**: Link to relevant listings and other blog posts
4. **Content Length**: Aim for 1,500+ words for better ranking
5. **Tags**: Use 3-5 relevant tags per post
6. **Images**: Add featured images for better engagement

### Content Ideas for Ranking

1. **How-To Guides**
   - "Step-by-Step Guide to Booking a PG"
   - "Checklist Before Moving to a PG"
   - "How to Negotiate PG Rent"

2. **Location Guides**
   - "Living in [Area Name]"
   - "Best Streets Near Presidency University"

3. **Comparison Content**
   - "PG vs Hostel: Which is Better"
   - "Furnished vs Unfurnished PG"

4. **FAQ/Informational**
   - "Common Issues in PGs and Solutions"
   - "Legal Rights of PG Tenants"

5. **Reviews/Rankings**
   - "Top 10 Safe Neighborhoods for Girls"
   - "Best Value PGs in Bangalore"

## 🔗 Internal Linking Strategy

### Link from Blog to Listings:
In blog posts, link to:
- Specific areas: `/pg-near-presidency-university?area=Dibbur`
- Gender filters: `/pg-near-presidency-university?gender=girls`
- Price range: `/pg-near-presidency-university?minPrice=8000&maxPrice=12000`

### Link from Listings to Blog:
The listing detail page has a CTA button directing to blog for related articles.

## 📈 Monitoring Blog Performance

### Check Blog Stats:
- **Views**: Monitor via Google Analytics (track `/blog/*` pages)
- **Engagement**: Check average time on page, bounce rate
- **Rankings**: Use Google Search Console to see keyword rankings

### Submit to Search Engines:
1. Google Search Console: Submit blog URLs
2. Bing Webmaster Tools: Link your sitemap
3. The `/blog` pages are automatically included in `/sitemap.xml`

## 🎯 SEO Checklist for Each Post

Before publishing:
- [ ] Title includes target keyword
- [ ] Excerpt under 160 characters
- [ ] H2/H3 headings include keywords
- [ ] Content is 1,500+ words
- [ ] Internal links added (3-5)
- [ ] 3-5 relevant tags
- [ ] Featured image (if possible)
- [ ] Tags are accurate
- [ ] Category is correct

## 🚨 Troubleshooting

### Blog posts not showing?
```bash
# Check if MongoDB is running
# Verify MONGODB_URI environment variable
# Run: node scripts/seedBlog.js
```

### Schema validation error?
```javascript
// Ensure category is one of: 'guide', 'location', 'faq', 'comparison', 'review'
// Content must be HTML or plain text, not markdown
```

### Reading time calculation off?
- Automatic calculation: ~200 words per minute
- Override by setting `readingTime` field directly

## 📞 Support

Questions? Refer to:
- BlogPost schema: `/src/models/BlogPost.ts`
- Blog API: `/src/app/api/blog/route.ts`
- Sample posts: `/scripts/sampleBlogPosts.js`

---

**Next Steps:**
1. ✅ Run `node scripts/seedBlog.js`
2. ✅ Visit `/blog` to see sample posts
3. ✅ Edit sample posts to match your voice
4. ✅ Write new posts targeting keywords
5. ✅ Link blog posts from home page/listings
6. ✅ Monitor performance in Google Search Console
