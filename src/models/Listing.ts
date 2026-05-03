import mongoose, { Schema } from "mongoose";

const ListingSchema = new Schema(
  {
    title: String,
    description: { type: String },
    slug: { type: String, unique: true },
    price: Number,
    gender: { type: String, enum: ["any", "male", "female"] },
    amenities: [String],
    images: [{ type: String }],
    ownerName: String,
    contactPhone: String,
    contactWhatsApp: String,
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    address: String,
    distanceFromUni: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);