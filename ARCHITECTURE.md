# System Architecture & Data Flow

## Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Listing Page (page.tsx)                     │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  ProtectedContact Component                         │ │  │
│  │  │                                                    │ │  │
│  │  │  [Blurred] → [Unlock Button] → [Login Modal]     │ │  │
│  │  │             ↓                                     │ │  │
│  │  │        [Contact Details Shown]                    │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │                         ↕                                │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  PhoneLoginModal                                     │ │  │
│  │  │  - Enter Name & Phone                              │ │  │
│  │  │  - Sends to Firebase                               │ │  │
│  │  │  - Show OTPModal                                   │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                         ↕                                │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  OTPModal                                            │ │  │
│  │  │  - 6-digit OTP input                               │ │  │
│  │  │  - Verify with Firebase                            │ │  │
│  │  │  - Save to MongoDB                                 │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           AuthContext (Authentication State)             │  │
│  │                                                          │  │
│  │  - user: { uid, phoneNumber, name }                   │  │
│  │  - loading: boolean                                   │  │
│  │  - logout(): Promise<void>                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
        ↓                                           ↓
   (Firebase API)                              (Backend APIs)
        ↓                                           ↓
┌──────────────────────────┐  ┌──────────────────────────────────┐
│  Firebase Authentication │  │   Next.js API Routes            │
│                          │  │                                  │
│  - Phone OTP Send        │  │  POST /api/users/register       │
│  - OTP Verification      │  │  POST /api/users/get            │
│  - Auth State Management │  │  POST /api/users/unlock         │
│  - reCAPTCHA            │  │  POST /api/interactions/track    │
└──────────────────────────┘  │  GET  /api/users/analytics      │
        ↓                      │  GET  /api/admin/dashboard      │
        ↓                      └──────────────────────────────────┘
        │                              ↓
        │                          (MongoDB)
        │                              ↓
        └─────────────────────────────────────────┐
                                                  ↓
                                    ┌──────────────────────┐
                                    │   MongoDB Database   │
                                    │                      │
                                    │  Collections:        │
                                    │  - users             │
                                    │  - listings          │
                                    │  - admins            │
                                    └──────────────────────┘
```

## User Authentication Flow

```
1. USER VISITS LISTING PAGE
   │
   ├─→ ProtectedContact checks auth state (AuthContext)
   │   │
   │   ├─→ User NOT logged in?
   │   │   └─→ Show [Unlock Contact] button with blur
   │   │
   │   └─→ User IS logged in?
   │       └─→ Show contact details with Call & WhatsApp buttons
   │
2. USER CLICKS "UNLOCK CONTACT"
   │
   ├─→ PhoneLoginModal opens
   │   │
   │   ├─→ User enters Name
   │   └─→ User enters Phone Number (10 digits)
   │
3. USER CLICKS "SEND OTP"
   │
   ├─→ Frontend calls Firebase: signInWithPhoneNumber()
   │   │
   │   ├─→ Firebase validates phone number format
   │   ├─→ Firebase checks reCAPTCHA
   │   ├─→ Firebase sends OTP via SMS
   │   └─→ Store confirmationResult
   │
4. FIREBASE SENDS OTP TO USER'S PHONE
   │
   ├─→ User receives SMS with 6-digit code
   │   │
   │   └─→ OTPModal appears
   │
5. USER ENTERS OTP
   │
   ├─→ Frontend validates 6-digit input
   │   │
   │   └─→ User clicks "Verify OTP"
   │
6. FIREBASE VERIFIES OTP
   │
   ├─→ Frontend calls confirmationResult.confirm(otp)
   │   │
   │   ├─→ Firebase validates OTP
   │   ├─→ Create Firebase user session
   │   └─→ Return firebaseUser object
   │
7. SAVE USER TO MONGODB
   │
   ├─→ Frontend calls POST /api/users/register
   │   │
   │   ├─→ {firebaseUid, phoneNumber, name}
   │   │
   │   └─→ API creates/updates User in MongoDB
   │       └─→ AuthContext updates with user data
   │
8. UNLOCK LISTING (Optional)
   │
   ├─→ Frontend calls POST /api/users/unlock
   │   │
   │   ├─→ {firebaseUid, listingId}
   │   │
   │   └─→ API adds listing to user.unlockedListings
   │
9. SHOW CONTACT DETAILS
   │
   ├─→ ProtectedContact re-renders with user data
   │   │
   │   └─→ Shows:
   │       ├─ Phone number
   │       ├─ [Call] button
   │       └─ [WhatsApp] button
   │
10. USER CLICKS CALL OR WHATSAPP
   │
   └─→ Frontend calls POST /api/interactions/track
       │
       ├─→ {firebaseUid, listingId, interactionType}
       │
       └─→ API logs interaction to user.interactions
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Data Flow                          │
└─────────────────────────────────────────────────────────────┘

1. REGISTRATION
   ┌──────────────────┐
   │  Firebase        │
   │  ├─ UID          │
   │  └─ Phone #      │
   └────────┬─────────┘
            │
            ↓
   ┌──────────────────────────────────────┐
   │  MongoDB User Document               │
   │  ├─ _id: ObjectID                   │
   │  ├─ firebaseUid: String             │
   │  ├─ phoneNumber: "9876543210"       │
   │  ├─ name: "John Doe"                │
   │  ├─ unlockedListings: []            │
   │  ├─ interactions: []                │
   │  ├─ createdAt: Date                 │
   │  └─ lastLoginAt: Date               │
   └──────────────────────────────────────┘

2. UNLOCK LISTING
   ┌──────────────────────────┐
   │  Unlock Request          │
   │  ├─ firebaseUid          │
   │  └─ listingId            │
   └────────┬─────────────────┘
            │
            ↓
   ┌──────────────────────────────────────┐
   │  MongoDB User Update                 │
   │  unlockedListings: [{               │
   │    listingId: "...",                │
   │    unlockedAt: ISODate(...)         │
   │  }]                                  │
   └──────────────────────────────────────┘

3. TRACK INTERACTION
   ┌──────────────────────────┐
   │  Interaction Event       │
   │  ├─ firebaseUid          │
   │  ├─ listingId            │
   │  └─ type: "call"/"whatsapp"  │
   └────────┬─────────────────┘
            │
            ↓
   ┌──────────────────────────────────────┐
   │  MongoDB User Update                 │
   │  interactions: [{                   │
   │    listingId: "...",                │
   │    interactionType: "call",         │
   │    timestamp: ISODate(...)          │
   │  }]                                  │
   └──────────────────────────────────────┘

4. ANALYTICS
   ┌──────────────────────────────────────┐
   │  Stats Calculated from Data          │
   │  ├─ Total Unlocked: 3                │
   │  ├─ Total Interactions: 5            │
   │  ├─ Calls: 3                         │
   │  └─ WhatsApps: 2                     │
   └──────────────────────────────────────┘
```

## Component Hierarchy

```
<RootLayout>
  └─ <Providers>  (from providers.tsx)
      ├─ <SessionProvider>  (NextAuth)
      └─ <AuthProvider>     (Firebase Auth Context)
          │
          └─ <YourAppContent>
              │
              ├─ <ListingPage>
              │   │
              │   └─ <ProtectedContact>
              │       ├─ Uses: useAuth() hook
              │       │
              │       ├─ NOT logged in:
              │       │   ├─ Shows blurred contact
              │       │   └─ <PhoneLoginModal>
              │       │       └─ <OTPModal>
              │       │
              │       └─ Logged in:
              │           ├─ Shows contact details
              │           └─ Call/WhatsApp buttons
              │               └─ Track interactions
              │
              └─ <AdminDashboard>
                  └─ Displays analytics from API
```

## API Call Sequence

```
1. Login Flow
   ┌─ Frontend
   │   └─ PhoneLoginModal: signInWithPhoneNumber()
   │       └─ Firebase API (external)
   │
   ├─ Firebase SMS Gateway
   │   └─ Send OTP to phone
   │
   ├─ User enters OTP
   │   └─ Frontend: confirmationResult.confirm(otp)
   │       └─ Firebase API (external)
   │
   ├─ Firebase returns user
   │   └─ Frontend: POST /api/users/register
   │       └─ MongoDB: create User
   │           └─ AuthContext: setUser()
   │
   └─ Contact revealed!

2. Unlock Listing
   ├─ Frontend: POST /api/users/unlock
   │   └─ MongoDB: add to unlockedListings
   │
   └─ Listing marked as unlocked

3. Track Interactions
   ├─ User clicks Call/WhatsApp
   │   └─ Frontend: POST /api/interactions/track
   │       └─ MongoDB: add to interactions
   │
   └─ Interaction logged

4. View Analytics
   ├─ Frontend: GET /api/users/analytics?firebaseUid=...
   │   └─ MongoDB: aggregation query
   │       └─ Return stats + history
   │
   └─ Analytics displayed
```

## Database Schema Relationships

```
Listing Document (Existing)
├─ _id
├─ title
├─ ownerName
├─ contactPhone
├─ contactWhatsApp
└─ ...other fields

User Document (NEW)
├─ _id
├─ firebaseUid (unique)
├─ phoneNumber
├─ name
├─ unlockedListings[]  ───→ References Listing._id
│  ├─ listingId
│  └─ unlockedAt
├─ interactions[]      ───→ References Listing._id
│  ├─ listingId
│  ├─ interactionType
│  └─ timestamp
└─ timestamps (createdAt, updatedAt)
```

## Error Handling Flow

```
User Input
    ↓
Validation (Frontend)
    ├─ Valid? → Continue
    └─ Invalid? → Show error, re-prompt
         ↓
Firebase Validation
    ├─ Success? → Continue
    └─ Failed? → Show Firebase error
         ↓
MongoDB Validation
    ├─ Success? → Continue
    └─ Database error? → 500 error, retry
         ↓
Return to User
```

## Security Flow

```
1. User Input
   ├─ Frontend validates format
   └─ Sends to Firebase
       │
       ├─ Firebase validates
       ├─ reCAPTCHA checks
       ├─ Rate limits
       └─ Sends OTP
            │
            └─ API validates OTP
                 │
                 ├─ Firebase returns UID
                 ├─ API validates UID
                 └─ MongoDB saves securely
                     │
                     └─ Return user to frontend
```

---

**This architecture ensures:**
- ✅ Real-time authentication
- ✅ Secure phone verification
- ✅ Complete user tracking
- ✅ Analytics availability
- ✅ Easy integration with existing code
- ✅ Scalable MongoDB backend
