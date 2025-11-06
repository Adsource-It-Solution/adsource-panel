import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Brand.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });

    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
