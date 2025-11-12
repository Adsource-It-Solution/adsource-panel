import mongoose, { Schema, models, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String },
    logo: { type: String },
    category: {
      type: String,
      enum: ["panel", "inverter", "battery", "cable"],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error during hot reload or multiple imports
const Brand = models.Brand || model("Brand", brandSchema);

export default Brand;
