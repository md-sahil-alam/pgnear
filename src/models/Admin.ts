import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: String,
  },
  { timestamps: true }
);

export default mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);