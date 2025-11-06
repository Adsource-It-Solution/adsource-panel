import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: ("admin" | "ngo" | "solar" | "billing")[]; 
  pdfCount: number;
  lastLogin: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pdfCount: { type: Number, default: 0 },
    lastLogin: { type: Date, default: Date.now },
    role: [
      {
        type: String,
        enum: ["admin", "ngo", "solar", "billing"], 
        required: true,
      },
    ], 
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
