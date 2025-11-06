import mongoose, { Schema, Document, models } from "mongoose";

export interface ICompany extends Document {
  userId: mongoose.Schema.Types.ObjectId; 
  name: string;
  address?: string;
  logo?: string; 
  registrationNumber?: string;
  panNumber?: string;
  gstNumber?: string;
  email?: string,
  contactNumber?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {type: String, trim: true,},
    panNumber: {type: String, trim: true,},
    gstNumber: {type: String, trim: true,},
    email: {type: String, trim: true,},
    contactNumber: {type: String, trim: true,},
    website: {type: String, trim: true,},
    address: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Company = models.Company || mongoose.model<ICompany>("Company", CompanySchema);
export default Company;
