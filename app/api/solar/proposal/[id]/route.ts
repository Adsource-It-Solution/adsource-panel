import { NextResponse } from "next/server";
import Proposal from "@/app/models/Proposal";
import connectDB from "@/app/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const proposal = await Proposal.findById(params.id);
  if (!proposal)
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  return NextResponse.json(proposal);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const { _id, ...updateData } = body;
  const updated = await Proposal.findByIdAndUpdate(params.id, updateData, {
    new: true,
    runValidators: true,
    });
  return NextResponse.json({
    message: "✅ Proposal updated successfully",
    proposal: updated,
  });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  await Proposal.findByIdAndUpdate(id, { deletedAt: new Date() });

  return NextResponse.json({ message: "Proposal moved to Recycle Bin" });
}