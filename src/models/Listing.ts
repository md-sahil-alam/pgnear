import mongoose, { Schema } from "mongoose";

const ListingSchema = new Schema(
  {
    title: String,
    description: { type: String },
    owner: { type: String, default: null },
    slug: { type: String, unique: true },
    price: Number,
    oneSharingprice: { type: Number, default: null},
    twoSharingprice: { type: Number, default: null},
    threeSharingprice: { type: Number, default: null },
    gender: { type: String, enum: ["all", "boys", "girls"], default: "all" },
    amenities: [String],
    images: [{ type: String }],
    ownerName: String,
    contactPhone: {
      type: String,
      match: /^[0-9]{10}$/
    }   ,
    contactWhatsApp:  {
      type: String,
      match: /^[0-9]{10}$/
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    address: String,
    distanceFromUni: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);