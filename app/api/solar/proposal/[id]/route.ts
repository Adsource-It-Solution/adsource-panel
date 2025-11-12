import { NextRequest, NextResponse } from "next/server";
import Proposal from "@/app/models/Proposal";
import connectDB from "@/app/lib/db";

// ====================== GET ======================
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const proposal = await Proposal.findById(id);

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    return NextResponse.json(proposal, { status: 200 });
  } catch (err: any) {
    console.error("GET /proposal/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ====================== PUT ======================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();
    const { _id, ...updateData } = body;

    const updatedProposal = await Proposal.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "✅ Proposal updated successfully", proposal: updatedProposal },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("PUT /proposal/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ====================== DELETE ======================
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    await Proposal.findByIdAndUpdate(id, { deletedAt: new Date() });

    return NextResponse.json({ message: "Proposal moved to Recycle Bin" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE /proposal/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
