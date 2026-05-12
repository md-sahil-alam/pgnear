# Skeleton Loading Test Guide

## 🚀 Quick Start Testing

Run the development server:
```bash
cd c:\Users\sahil\Desktop\newpg
pnpm dev
```

Server will start at: `http://localhost:3000`

## 📋 Test Scenarios

### 1. **Home Page Skeleton Loading** ✅
**Route:** `http://localhost:3000`
- **What to Check:**
  - On initial page load, you should see skeleton loaders for featured listings
  - Skeletons should appear instantly
  - Real listings should load and replace skeletons smoothly
  - Watch for smooth fade-in transition (animate-pulse effect)

### 2. **PG Listings Browse Page** ✅
**Route:** `http://localhost:3000/pg-near-presidency-university`
- **What to Check:**
  - Click "Listings" from navbar
  - Skeleton grid should appear instantly
  - Filters sidebar skeleton should load
  - Real listings should populate from API
  - Infinite scroll should load more listings with skeletons
  
**Expected Behavior:**
- Skeleton appears IMMEDIATELY on click
- Real content loads within 1-2 seconds
- Even on slow internet (throttled), skeleton appears first

### 3. **Listing Detail Page** ✅
**Route:** `http://localhost:3000/listing/[slug]`
- **What to Check:**
  - Click any listing card from browse page
  - Full listing detail skeleton should appear instantly
  - Includes: image placeholder, title, price table, amenities, contact info
  - Real content loads and replaces skeleton
  
**Expected Behavior:**
- Skeleton structure matches real content exactly
- Navbar loads immediately (not awaited)
- Content below Navbar shows skeleton first

### 4. **Wishlist Page** ✅
**Route:** `http://localhost:3000/wishlist`
- **What to Check:**
  - Click "Wishlist" from navbar (must be logged in)
  - Skeleton grid loads instantly
  - Same structure as listing cards
  - Real wishlist items load and populate

**Test Flow:**
1. Open developer tools → Network tab → Throttle to "Slow 4G"
2. Click "Wishlist" 
3. Watch skeleton appear immediately
4. Wait for real wishlist items to load

## 🎯 Network Throttling Test (Recommended)

To simulate slow internet and verify skeleton UX:

### Chrome/Edge Developer Tools:
1. Press `F12` to open DevTools
2. Go to **Network** tab
3. Click throttling dropdown (top left, usually says "No throttling")
4. Select **Slow 4G** or **Fast 3G**
5. Reload page or click navigation link

### Expected Results:
- Skeleton loads immediately (< 100ms)
- Actual content loads in 2-5 seconds
- Creates perception of fast app even on slow connection

## 📊 Performance Checklist

- [ ] Skeleton appears before API call completes
- [ ] Skeleton structure matches real content
- [ ] No layout shift when skeleton → real content
- [ ] Smooth animate-pulse effect (no jarring)
- [ ] Mobile responsive (check on viewport < 768px)
- [ ] Works with back/forward browser buttons
- [ ] Suspense boundaries working properly

## 🔍 Key Files to Monitor

During testing, watch these network requests in DevTools:

1. **API Listings:** `/api/listings`
   - Shows when listing grid loads
   - Skeleton appears before this completes

2. **API Listing Detail:** `/listing/[slug]` server component
   - Shows when detail page loads
   - Skeleton appears before content

3. **API Wishlist:** `/api/wishlist`
   - Shows when wishlist page loads
   - Skeleton appears immediately

## 💡 What You Should See

### ✅ Good UX (What We're Testing For):
```
Click Link → Skeleton Appears (instant) → Real Content Loads → Smooth Transition
```

### ❌ Bad UX (What We're Avoiding):
```
Click Link → Blank/White Screen → Content Appears (jarring)
```

## 🎨 Visual Indicators

Skeleton has these visual characteristics:
- **Color:** Light gray (`bg-gray-200`)
- **Animation:** Smooth pulse effect (opacity 0.5 to 1)
- **Rounded Corners:** `rounded-2xl` for cards, `rounded-lg` for content
- **Spacing:** Matches real component spacing

## 🧪 Test Cases

### Test 1: Route Navigation (Fast Connection)
```
1. Open http://localhost:3000
2. Click "Listings" 
3. Observe: Skeleton appears immediately, content loads quickly
4. Click any PG card
5. Observe: Detail skeleton appears, content loads
6. Click back arrow
7. Observe: Return to listings (skeleton not needed, instant)
```

### Test 2: Slow Network Simulation
```
1. Open DevTools → Network tab
2. Enable "Slow 4G" throttling
3. Go to /pg-near-presidency-university
4. Watch skeleton load for ~3-5 seconds
5. Real listings should eventually appear
6. Try scrolling down for infinite scroll skeleton
```

### Test 3: Mobile Responsive
```
1. Open DevTools → Device Toolbar
2. Select iPhone 12/Pixel 5
3. Navigate through pages
4. Check: Skeleton responsive and properly sized
5. Check: Text readable, spacing appropriate
```

### Test 4: Wishlist Loading
```
1. Login with phone/OTP
2. Navigate to /wishlist
3. On first visit (authLoading state), should show skeleton
4. Then show actual wishlist items
5. Throttle network and save a PG
6. Watch skeleton appear, real data replace
```

## 🐛 Debugging Tips

### If skeleton doesn't appear:
- Check browser console for errors
- Verify Suspense boundary is in place
- Confirm skeleton component is imported correctly

### If skeleton and content show together:
- Skeleton has `animate-pulse` class
- This creates a visual distinction

### If layout shifts when content loads:
- Verify skeleton height/width matches real content
- Check padding and spacing align

## 📈 Performance Metrics to Watch

In DevTools Performance tab:
- **FCP (First Contentful Paint):** Should include skeleton
- **LCP (Largest Contentful Paint):** Real content
- **CLS (Cumulative Layout Shift):** Should be minimal
- **TTI (Time to Interactive):** When content loads

## ✨ Expected Timeline

**Fast Connection (< 500ms):**
- Skeleton appears: ~0ms
- Real content appears: ~200-500ms
- Visible improvement from instant skeleton

**Slow Connection (3G, 2-5s):**
- Skeleton appears: ~0ms
- Real content appears: ~2-5s
- Skeleton prevents "white screen of death"

---

**Last Updated:** May 12, 2026
**Status:** ✅ All skeletons integrated and ready for testing
