import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    name: {
      type: String,
      required: true,
    },
    wishlist: [
      {
        listingId: {
          type: Schema.Types.ObjectId,
          ref: "Listing",
          required: true,
        },
        title: String,
        slug: String,
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    unlockedListings: [
      {
        listingId: {
          type: Schema.Types.ObjectId,
          ref: "Listing",
        },
        unlockedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    interactions: [
      {
        listingId: {
          type: Schema.Types.ObjectId,
          ref: "Listing",
        },
        pgName: String,
        interactionType: {
          type: String,
          enum: ["call", "whatsapp"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for wishlist queries
UserSchema.index({ firebaseUid: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);

