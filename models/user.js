import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    name: { type: String, required: true, default: "-" },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", userSchema);
