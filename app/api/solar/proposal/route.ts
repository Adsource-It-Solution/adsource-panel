import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Proposal from "@/app/models/Proposal";

export async function GET() {
  await connectDB();
  const proposals = await Proposal.find({ deletedAt: null })
    .sort({ createdAt: -1 })
  return NextResponse.json(proposals);
}
