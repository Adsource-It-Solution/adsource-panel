import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    // ✅ Unwrap params first
    const { id } = await context.params;

    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
