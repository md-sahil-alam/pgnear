import mongoose, { Schema } from "mongoose";

const WishlistSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicates and speed up queries
WishlistSchema.index({ firebaseUid: 1, listingId: 1 }, { unique: true });

// Index for getting user's wishlist
WishlistSchema.index({ firebaseUid: 1, createdAt: -1 });

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
