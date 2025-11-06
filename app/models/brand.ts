import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String },
  logo: { type: String },
  category: {
    type: String,
    enum: ["panel", "inverter", "battery", "cable"], 
    required: true
  }
}, { timestamps: true });

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;