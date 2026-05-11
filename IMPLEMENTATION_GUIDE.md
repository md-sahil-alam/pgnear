# Implementation Checklist & Integration Guide

## Step 1: Firebase Setup ✅

- [ ] Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Enable Phone Authentication in Firebase Console
- [ ] Add your domain(s) to authorized domains
- [ ] Copy Firebase credentials
- [ ] Create `.env.local` file with credentials

```bash
# Copy example file
cp .env.local.example .env.local

# Then update with your Firebase credentials
```

## Step 2: Install Dependencies ✅

```bash
# Install Firebase
pnpm install firebase
```

Check that `package.json` has Firebase:
```json
"firebase": "^10.7.0"
```

## Step 3: File Structure Verification ✅

All files are already created:

```
src/
├── lib/
│   └── firebase.ts                 ✅ Firebase config
├── models/
│   └── User.ts                     ✅ MongoDB User schema
├── context/
│   └── AuthContext.tsx             ✅ Auth state management
├── components/
│   ├── OTPModal.tsx                ✅ OTP verification UI
│   ├── PhoneLoginModal.tsx         ✅ Phone login form
│   └── ProtectedContact.tsx        ✅ Contact unlock component
├── app/
│   ├── providers.tsx               ✅ Updated with AuthProvider
│   ├── api/
│   │   ├── users/
│   │   │   ├── register/route.ts  ✅ User registration
│   │   │   ├── get/route.ts       ✅ Get user data
│   │   │   └── unlock/route.ts    ✅ Unlock listing
│   │   ├── interactions/
│   │   │   └── track/route.ts     ✅ Track interactions
│   │   └── admin/
│   │       └── dashboard/route.ts ✅ Admin stats
│   └── admin/
│       └── analytics/page.tsx     ✅ Analytics dashboard
```

## Step 4: Integration Steps

### 4.1 Update Your Listing Page

In your listing detail page (e.g., `src/app/listing/[slug]/page.tsx`):

```tsx
import ProtectedContact from "@/components/ProtectedContact";

export default function ListingPage({ listing }: any) {
  return (
    <div>
      {/* Your existing listing content */}

      {/* Add this component for contact unlock */}
      <ProtectedContact
        phoneNumber={listing.contactPhone}  // 10-digit number
        whatsAppNumber={listing.contactWhatsApp}
        listingId={listing._id.toString()}
        ownerName={listing.ownerName}
      />
    </div>
  );
}
```

### 4.2 Use Auth Context in Components

```tsx
"use client";

import { useAuth } from "@/context/AuthContext";

export default function YourComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user) {
    return (
      <div>
        <p>Welcome {user.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <p>Please login</p>;
}
```

## Step 5: Database Verification ✅

MongoDB User collection structure:

```javascript
{
  _id: ObjectId,
  firebaseUid: "firebase_uid_here",
  phoneNumber: "9876543210",
  name: "User Name",
  unlockedListings: [
    {
      listingId: ObjectId,
      unlockedAt: ISODate("2024-01-15T10:30:00.000Z")
    }
  ],
  interactions: [
    {
      listingId: ObjectId,
      interactionType: "call",  // or "whatsapp"
      timestamp: ISODate("2024-01-15T10:35:00.000Z")
    }
  ],
  lastLoginAt: ISODate("2024-01-15T10:30:00.000Z"),
  createdAt: ISODate("2024-01-15T10:25:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

## Step 6: Testing the Flow

### Manual Testing Checklist

1. **Start Development Server**
   ```bash
   pnpm dev
   ```

2. **Test User Signup**
   - [ ] Click "Unlock Contact Details"
   - [ ] Enter name and phone number
   - [ ] Firebase sends OTP
   - [ ] Verify OTP comes through
   - [ ] User data saves to MongoDB

3. **Test Contact Reveal**
   - [ ] Contact details appear after login
   - [ ] "Call" button works
   - [ ] "WhatsApp" button works
   - [ ] User can see contact on page refresh

4. **Test Interaction Tracking**
   - [ ] Click "Call" button
   - [ ] Check API call to `/api/interactions/track`
   - [ ] Verify data saved in MongoDB
   - [ ] Check `/api/users/analytics` returns interaction data

5. **Test Analytics Dashboard**
   - [ ] Go to `/admin/analytics`
   - [ ] Verify user stats display
   - [ ] Check interaction counts
   - [ ] Verify calls and WhatsApp counts

### Firebase Console Testing

Use test phone numbers in Firebase Console:

1. Go to **Authentication > Phone > Test Numbers**
2. Add test numbers like `9999999999`
3. Set OTP to `123456`
4. Use these for testing

## Step 7: Production Checklist

- [ ] Remove test phone numbers from Firebase
- [ ] Set up proper error logging
- [ ] Configure reCAPTCHA with production domain
- [ ] Enable phone verification on production domain
- [ ] Set rate limiting on APIs
- [ ] Add input validation on all endpoints
- [ ] Set up MongoDB backups
- [ ] Add HTTPS/SSL certificate
- [ ] Configure CORS properly
- [ ] Add monitoring and alerts
- [ ] Review Firebase security rules
- [ ] Test with real phone numbers

## Step 8: Deployment

### Environment Variables for Production

```env
# Firebase (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# MongoDB (Atlas or self-hosted)
MONGODB_URI=...

# NextAuth
NEXTAUTH_SECRET=...
```

### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Add Firebase phone authentication"
git push origin main

# Link to Vercel and deploy
vercel
```

## Step 9: Monitoring & Analytics

### Access Analytics Dashboard

Visit: `https://yourdomain.com/admin/analytics`

You can see:
- Total users count
- Total interactions
- Calls vs WhatsApp usage
- User signup trends
- Unlocked listings per user
- Last login times

### Monitor API Performance

Check logs in:
- Firebase Console → Logs
- MongoDB Atlas → Charts
- Vercel → Functions/Analytics

## Step 10: Common Modifications

### Modify OTP Expiry Time

In Firebase Console:
- Authentication > Templates > SMS
- (Firebase handles OTP expiry automatically at 5 minutes)

### Customize OTP Modal UI

Edit: `src/components/OTPModal.tsx`

### Add More Fields to User Model

Edit: `src/models/User.ts`

### Track Additional Interactions

Edit: `src/components/ProtectedContact.tsx` and add new interaction types

### Change reCAPTCHA Settings

Edit: `src/components/PhoneLoginModal.tsx` → `new RecaptchaVerifier(...)`

## Troubleshooting Guide

### Problem: "Firebase is not defined"
- Solution: Check `src/lib/firebase.ts` is correctly configured
- Check env variables are set

### Problem: "OTP not received"
- Solution: Verify phone number format
- Check Firebase authentication is enabled
- Verify domain is authorized in Firebase

### Problem: "User data not saving"
- Solution: Check MongoDB connection
- Verify User model schema
- Check API response for errors

### Problem: "Auth context not working"
- Solution: Ensure AuthProvider wraps app in `providers.tsx`
- Check no circular imports
- Verify useAuth() is used in client component only

### Problem: reCAPTCHA shows errors
- Solution: Clear browser cache
- Check domain is authorized in Firebase
- Verify `recaptcha-container` div exists

## Files Created

| File | Purpose |
|------|---------|
| `src/lib/firebase.ts` | Firebase configuration |
| `src/models/User.ts` | MongoDB User schema |
| `src/context/AuthContext.tsx` | Auth state management |
| `src/components/OTPModal.tsx` | OTP verification modal |
| `src/components/PhoneLoginModal.tsx` | Phone login form |
| `src/components/ProtectedContact.tsx` | Contact unlock component |
| `src/app/api/users/register/route.ts` | User registration API |
| `src/app/api/users/get/route.ts` | Get user data API |
| `src/app/api/interactions/track/route.ts` | Track interactions API |
| `src/app/api/users/unlock/route.ts` | Unlock listing API |
| `src/app/admin/analytics/page.tsx` | Admin analytics dashboard |
| `src/app/api/admin/dashboard/route.ts` | Dashboard stats API |
| `.env.local.example` | Environment variables template |
| `FIREBASE_SETUP.md` | Detailed Firebase setup guide |
| `QUICK_START.md` | Quick start guide |
| `EXAMPLE_LISTING_USAGE.tsx` | Example implementation |

## Next.js App Router Support

All components use:
- ✅ `"use client"` directive for client components
- ✅ `async/await` for server-side operations
- ✅ `NextRequest` and `NextResponse` for API routes
- ✅ Next.js 16+ compatible

---

**Need Help?**

1. Check [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase setup
2. See [QUICK_START.md](./QUICK_START.md) for quick reference
3. Review [EXAMPLE_LISTING_USAGE.tsx](./EXAMPLE_LISTING_USAGE.tsx) for implementation
