import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Proposal from "@/app/models/Proposal";

interface ProposalData {
  _id?: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  console.log("📩 [API] POST /api/solar/proposal called");

  try {
    console.log("🔌 Connecting to database...");
    await dbConnect();
    console.log("✅ Database connected successfully");

    console.log("📦 Parsing request body...");
    const body: ProposalData = await req.json();
    console.log("🧾 Request Body Received:", JSON.stringify(body, null, 2));

    const { _id, ...data } = body;
    console.log("🧹 Cleaned Data (without _id):", JSON.stringify(data, null, 2));

    console.log("🧱 Creating new Proposal instance...");
    const proposal = new Proposal(data);
    console.log("📄 Proposal instance created:", proposal);

    console.log("💾 Saving proposal to database...");
    await proposal.save();
    console.log("✅ Proposal saved successfully with ID:", proposal._id);

    console.log("📤 Sending success response...");
    return NextResponse.json(
      {
        message: "✅ Proposal added successfully",
        proposal,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ [ERROR] Something went wrong while saving proposal:", err);

    // Handle duplicate key error
    if (err.code === 11000) {
      console.warn("⚠️ Duplicate key error detected:", err.keyValue);
      return NextResponse.json(
        { error: "Duplicate proposal detected. Please try again." },
        { status: 400 }
      );
    }

    console.error("💥 Unexpected Error:", err.message || "Unknown error");
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
