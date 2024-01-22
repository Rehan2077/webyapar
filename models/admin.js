import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    name: { type: String, required: true, default: "-" },
    password: { type: String, required: true },
    verified: { type: Boolean, default: true },
    admin: { type: Boolean, default: true },
    users: { type: [mongoose.Schema.Types.ObjectId], ref: "user" },
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("admin", adminSchema);
