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

export default mongoose.models.User || mongoose.model("User", UserSchema);
