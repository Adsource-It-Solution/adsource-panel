import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

// ✅ Correct handler with new param typing
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // ✅ Await params (it's a Promise in Next.js 14+)
    const { id } = await context.params;

    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Brand deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE /brands error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
