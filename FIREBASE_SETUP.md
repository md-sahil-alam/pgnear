# Firebase Phone Authentication Setup

## Environment Variables

Add these to your `.env.local` file:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Next Auth
NEXTAUTH_SECRET=your_nextauth_secret
```

## Firebase Setup Steps

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a new project"
   - Enter your project name and create

2. **Enable Phone Authentication**
   - In Firebase Console, go to Authentication > Sign-in method
   - Click on "Phone"
   - Enable Phone sign-in
   - Add your domain to authorized domains

3. **Get Firebase Config**
   - Go to Project Settings
   - Under "Your apps", select your web app
   - Copy the config values to `.env.local`

4. **Setup reCAPTCHA**
   - In Firebase Console, go to Authentication > reCAPTCHA Admin
   - Register your domain (localhost for development)
   - The reCAPTCHA is automatically configured

5. **Install Dependencies**
   ```bash
   npm install firebase
   # or
   pnpm install firebase
   ```

## Usage in Your Components

### Using ProtectedContact Component

```tsx
import ProtectedContact from "@/components/ProtectedContact";

export default function ListingPage() {
  return (
    <ProtectedContact
      phoneNumber="9876543210"
      whatsAppNumber="9876543210"
      listingId="listing_id_here"
      ownerName="John Doe"
    />
  );
}
```

### Accessing Auth State

```tsx
"use client";

import { useAuth } from "@/context/AuthContext";

export default function MyComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}!
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <div>Please login to continue</div>;
}
```

## MongoDB Schema

The User model stores:
- `firebaseUid`: Firebase user ID (unique)
- `phoneNumber`: User's 10-digit phone number
- `name`: User's full name
- `unlockedListings`: Array of listings the user has unlocked
  - `listingId`: Reference to Listing
  - `unlockedAt`: Timestamp
- `interactions`: Array of all user interactions
  - `listingId`: Reference to Listing
  - `interactionType`: "call" or "whatsapp"
  - `timestamp`: When the interaction occurred

## API Endpoints

### Register User
- **POST** `/api/users/register`
- **Body**: `{ firebaseUid, phoneNumber, name }`
- **Response**: User data

### Get User Data
- **POST** `/api/users/get`
- **Body**: `{ firebaseUid }`
- **Response**: User data with unlocked listings

### Track Interaction
- **POST** `/api/interactions/track`
- **Body**: `{ firebaseUid, listingId, interactionType }`
- **Response**: Success message

### Unlock Listing
- **POST** `/api/users/unlock`
- **Body**: `{ firebaseUid, listingId }`
- **Response**: Updated unlocked listings

## Features

✅ Phone number OTP authentication via Firebase
✅ One-time login - users don't need to login again
✅ Invisible reCAPTCHA integration
✅ Blurred contact details before login
✅ Contact reveal after login
✅ Tracking of user interactions (calls, WhatsApp)
✅ MongoDB persistence
✅ Responsive Tailwind CSS UI
✅ Error handling and loading states
✅ Auth context for easy state management

## Testing

1. Start your dev server: `npm run dev`
2. Visit a listing page
3. Click "Unlock Contact Details"
4. Enter your name and phone number
5. Receive OTP on your phone
6. Enter OTP and verify
7. Contact details will be revealed

**Note**: In development, you can use test phone numbers from Firebase Console's Authentication > Sign-in method > Phone section.
