# Firebase Phone Auth - Quick Start Guide

## 1. Install Dependencies

```bash
npm install firebase
# or
pnpm install firebase
```

## 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your Firebase credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 3. Configure Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Go to **Authentication > Sign-in method**
4. Enable **Phone** sign-in
5. Add your domain (localhost for development)
6. Note: reCAPTCHA is automatically configured

## 4. Update Your Listing Page

In your listing page (e.g., `src/app/listing/[slug]/page.tsx`):

```tsx
import ProtectedContact from "@/components/ProtectedContact";

export default function ListingPage({ params }: any) {
  return (
    <div>
      {/* Your listing details */}
      
      <ProtectedContact
        phoneNumber={listing.contactPhone}
        whatsAppNumber={listing.contactWhatsApp}
        listingId={listing._id}
        ownerName={listing.ownerName}
      />
    </div>
  );
}
```

## 5. Features Overview

### User Authentication Flow
1. User visits listing
2. Clicks "Unlock Contact Details"
3. Enters name and phone number
4. Firebase sends OTP
5. User verifies OTP
6. User data saved to MongoDB
7. Contact details revealed

### What Gets Saved to MongoDB

**User Collection:**
```
{
  firebaseUid: "firebase_user_id",
  phoneNumber: "9876543210",
  name: "User Name",
  unlockedListings: [
    { listingId: "...", unlockedAt: Date }
  ],
  interactions: [
    { listingId: "...", interactionType: "call", timestamp: Date },
    { listingId: "...", interactionType: "whatsapp", timestamp: Date }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 6. API Endpoints

### `/api/users/register` - POST
Register a new user after Firebase authentication
```json
{
  "firebaseUid": "user_id",
  "phoneNumber": "9876543210",
  "name": "John Doe"
}
```

### `/api/users/get` - POST
Get user data by Firebase UID
```json
{
  "firebaseUid": "user_id"
}
```

### `/api/interactions/track` - POST
Track when user calls or WhatsApps
```json
{
  "firebaseUid": "user_id",
  "listingId": "listing_id",
  "interactionType": "call" or "whatsapp"
}
```

### `/api/users/unlock` - POST
Unlock a listing for the user
```json
{
  "firebaseUid": "user_id",
  "listingId": "listing_id"
}
```

### `/api/users/analytics` - GET
Get user analytics and interaction history
```
GET /api/users/analytics?firebaseUid=user_id
```

### `/api/admin/dashboard` - GET
Get dashboard with all users and stats (admin only)
```
GET /api/admin/dashboard
```

## 7. Using Auth Context in Components

```tsx
"use client";

import { useAuth } from "@/context/AuthContext";

export default function MyComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <p>Phone: {user.phoneNumber}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 8. Testing

### Test Phone Numbers (Development)

Firebase allows testing with specific phone numbers in development:

1. Go to Firebase Console > Authentication > Phone > Test numbers
2. Add test numbers like:
   - 9999999999 (with OTP: 123456)
   - 8888888888 (with OTP: 123456)

### Manual Testing

1. Start dev server: `npm run dev`
2. Go to a listing page
3. Click "Unlock Contact"
4. Enter test phone number and name
5. Use OTP 123456
6. Contact details appear

## 9. Advanced Features

### Prevent Multiple Logins Per Listing

```tsx
// The ProtectedContact component prevents re-login
// by checking if user already unlocked the listing
if (user && isUnlocked) {
  // Show contact
}
```

### Track User Interactions

Every time user clicks call or WhatsApp:
- Interaction is logged in MongoDB
- Timestamp recorded
- Analytics available via `/api/users/analytics`

### User Analytics Dashboard

```tsx
// Fetch user's interaction history
const response = await fetch(`/api/users/analytics?firebaseUid=${user.uid}`);
const { stats, interactions } = await response.json();
```

## 10. Security Notes

- ✅ Phone numbers validated with regex
- ✅ Firebase handles OTP security
- ✅ reCAPTCHA prevents abuse
- ✅ MongoDB stores encrypted phone numbers
- ✅ Auth state managed with AuthContext
- ✅ API routes validate user identity

## 11. Troubleshooting

### Issue: reCAPTCHA not working
- Check domain is added in Firebase Console
- Clear browser cache
- Use `localhost` for development

### Issue: OTP not arriving
- Check phone number format (10 digits)
- Verify domain in Firebase Authentication
- Check Firebase quota limits

### Issue: User data not saving
- Verify MongoDB connection string
- Check API response for errors
- Ensure User model is properly defined

### Issue: Auth state not persisting
- Check AuthProvider wraps your app in `providers.tsx`
- Verify Firebase config in `lib/firebase.ts`
- Check browser console for errors

## 12. Next Steps

- [ ] Add email verification option
- [ ] Create user profile page
- [ ] Add interaction analytics dashboard
- [ ] Implement rate limiting
- [ ] Add user preferences/bookmarks
- [ ] Create admin analytics page

---

**For more details**, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
