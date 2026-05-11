# API Documentation

## Authentication & User Management APIs

### 1. Register User
**Endpoint:** `POST /api/users/register`

Register a user after successful Firebase phone authentication.

**Request Body:**
```json
{
  "firebaseUid": "firebase_user_id_from_auth",
  "phoneNumber": "9876543210",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "firebaseUid": "firebase_user_id_from_auth",
  "phoneNumber": "9876543210",
  "name": "John Doe"
}
```

**Error (400):**
```json
{
  "error": "Missing required fields"
}
```

**Usage in Code:**
```typescript
const response = await fetch("/api/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firebaseUid: user.uid,
    phoneNumber: "9876543210",
    name: "John Doe"
  })
});
const userData = await response.json();
```

---

### 2. Get User Data
**Endpoint:** `POST /api/users/get`

Retrieve user information and unlocked listings.

**Request Body:**
```json
{
  "firebaseUid": "firebase_user_id"
}
```

**Response (200 OK):**
```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "John Doe",
  "phoneNumber": "9876543210",
  "unlockedListings": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "listingId": "64a1b2c3d4e5f6g7h8i9j0k3",
      "unlockedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error (404):**
```json
{
  "error": "User not found"
}
```

**Usage in Code:**
```typescript
const response = await fetch("/api/users/get", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ firebaseUid: user.uid })
});
const userData = await response.json();
console.log("Unlocked listings:", userData.unlockedListings);
```

---

### 3. Unlock Listing
**Endpoint:** `POST /api/users/unlock`

Mark a listing as unlocked for a user (called after login).

**Request Body:**
```json
{
  "firebaseUid": "firebase_user_id",
  "listingId": "64a1b2c3d4e5f6g7h8i9j0k3"
}
```

**Response (201 Created):**
```json
{
  "message": "Listing unlocked successfully",
  "unlockedListings": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "listingId": "64a1b2c3d4e5f6g7h8i9j0k3",
      "unlockedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Response if already unlocked (200 OK):**
```json
{
  "message": "Listing already unlocked",
  "unlockedListings": [...]
}
```

**Error (404):**
```json
{
  "error": "User not found"
}
```

**Usage in Code:**
```typescript
const response = await fetch("/api/users/unlock", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firebaseUid: user.uid,
    listingId: "64a1b2c3d4e5f6g7h8i9j0k3"
  })
});
const data = await response.json();
```

---

## Interaction Tracking APIs

### 4. Track Interaction
**Endpoint:** `POST /api/interactions/track`

Log when a user makes a call or sends WhatsApp message.

**Request Body:**
```json
{
  "firebaseUid": "firebase_user_id",
  "listingId": "64a1b2c3d4e5f6g7h8i9j0k3",
  "interactionType": "call"
}
```

**Request Body Options:**
```json
{
  "firebaseUid": "firebase_user_id",
  "listingId": "64a1b2c3d4e5f6g7h8i9j0k3",
  "interactionType": "whatsapp"
}
```

**Response (200 OK):**
```json
{
  "message": "Interaction tracked successfully"
}
```

**Error (400):**
```json
{
  "error": "Invalid interaction type"
}
```

**Validation:**
- `interactionType` must be "call" or "whatsapp"

**Usage in Code:**
```typescript
// Track a call
await fetch("/api/interactions/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firebaseUid: user.uid,
    listingId: listingId,
    interactionType: "call"
  })
});

// Track WhatsApp
await fetch("/api/interactions/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firebaseUid: user.uid,
    listingId: listingId,
    interactionType: "whatsapp"
  })
});
```

---

## Analytics APIs

### 5. Get User Analytics
**Endpoint:** `GET /api/users/analytics?firebaseUid=USER_ID`

Get detailed analytics for a specific user.

**Query Parameters:**
- `firebaseUid` (required) - Firebase user ID

**Response (200 OK):**
```json
{
  "user": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "phoneNumber": "9876543210",
    "firebaseUid": "firebase_user_id",
    "createdAt": "2024-01-15T10:25:00.000Z",
    "lastLoginAt": "2024-01-15T10:30:00.000Z"
  },
  "stats": {
    "totalListingsUnlocked": 3,
    "totalInteractions": 5,
    "callCount": 3,
    "whatsappCount": 2
  },
  "unlockedListings": [
    {
      "_id": "...",
      "listingId": {
        "_id": "...",
        "title": "PG Near University"
      },
      "unlockedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "interactions": [
    {
      "_id": "...",
      "listingId": {
        "_id": "...",
        "title": "PG Near University"
      },
      "interactionType": "call",
      "timestamp": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

**Error (404):**
```json
{
  "error": "User not found"
}
```

**Usage in Code:**
```typescript
const response = await fetch(
  `/api/users/analytics?firebaseUid=${user.uid}`
);
const analytics = await response.json();
console.log("User stats:", analytics.stats);
console.log("Interaction history:", analytics.interactions);
```

---

### 6. Get Admin Dashboard
**Endpoint:** `GET /api/admin/dashboard`

Get aggregated analytics for all users.

**Response (200 OK):**
```json
{
  "stats": {
    "totalUsers": 42,
    "totalInteractions": 156,
    "totalCalls": 98,
    "totalWhatsapps": 58,
    "avgInteractionsPerUser": "3.71"
  },
  "users": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "phoneNumber": "9876543210",
      "createdAt": "2024-01-15T10:25:00.000Z",
      "lastLoginAt": "2024-01-15T10:30:00.000Z",
      "unlockedListingsCount": 3,
      "interactionsCount": 5,
      "calls": 3,
      "whatsapps": 2
    },
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Jane Smith",
      "phoneNumber": "8765432109",
      "createdAt": "2024-01-14T14:20:00.000Z",
      "lastLoginAt": "2024-01-15T09:45:00.000Z",
      "unlockedListingsCount": 2,
      "interactionsCount": 4,
      "calls": 2,
      "whatsapps": 2
    }
  ]
}
```

**Usage in Code:**
```typescript
const response = await fetch("/api/admin/dashboard");
const dashboardData = await response.json();
console.log("Total users:", dashboardData.stats.totalUsers);
console.log("All users:", dashboardData.users);
```

---

## Error Handling

All endpoints follow standard HTTP status codes:

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Successful GET or verification |
| 201 | Created | User registered, data created |
| 400 | Bad Request | Missing or invalid fields |
| 404 | Not Found | User or resource not found |
| 500 | Server Error | Database or server error |

**Standard Error Response:**
```json
{
  "error": "Description of what went wrong"
}
```

---

## Rate Limiting (Recommended)

For production, add rate limiting:

```typescript
// Example with next-rate-limit
import rateLimit from 'next-rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  tokensPerInterval: 5, // 5 requests per minute
});

export async function POST(request: NextRequest) {
  await limiter.check();
  // ... rest of code
}
```

---

## Security Headers

All API responses should include:
```
Content-Type: application/json
X-Content-Type-Options: nosniff
```

---

## Example Integration

Complete flow example:

```typescript
// 1. User enters phone and name
const phoneNumber = "9876543210";
const name = "John Doe";

// 2. Firebase sends OTP (handled by Firebase)

// 3. User verifies OTP with Firebase
const userCredential = await confirmationResult.confirm(otp);
const firebaseUser = userCredential.user;

// 4. Register user in MongoDB
const registerRes = await fetch("/api/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firebaseUid: firebaseUser.uid,
    phoneNumber,
    name
  })
});

// 5. Unlock the listing
await fetch("/api/users/unlock", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firebaseUid: firebaseUser.uid,
    listingId: "64a1b2c3d4e5f6g7h8i9j0k3"
  })
});

// 6. Track interactions
const handleCall = async () => {
  await fetch("/api/interactions/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseUid: firebaseUser.uid,
      listingId: "64a1b2c3d4e5f6g7h8i9j0k3",
      interactionType: "call"
    })
  });
};

// 7. View analytics
const analyticsRes = await fetch(
  `/api/users/analytics?firebaseUid=${firebaseUser.uid}`
);
const analytics = await analyticsRes.json();
console.log(analytics.stats);
```

---

## Database Validation

The APIs automatically validate:
- ✅ Firebase UID exists and matches a user
- ✅ Phone number format (10 digits)
- ✅ Name is not empty
- ✅ ListingID is valid MongoDB ObjectID
- ✅ InteractionType is "call" or "whatsapp"

---

## Response Times

Typical response times:
- Registration: 100-200ms
- Get user data: 50-100ms
- Track interaction: 50-100ms
- Analytics: 100-300ms (depends on data)
- Dashboard: 200-500ms (all users data)

---

For more details, see [API_EXAMPLES.md](./API_EXAMPLES.md) or contact support.
