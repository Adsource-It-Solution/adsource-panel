import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

export async function GET(req: NextRequest, context: { params: Promise<{ category: string }> }) {
  try {
    await dbConnect();

    // ✅ Await the promise before destructuring
    const { category } = await context.params;
    console.log("Fetching brands for category:", category);
    

    const brands = await Brand.find({ category });
    return NextResponse.json(brands);
  } catch (err: any) {
    console.error("Server error fetching brands:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
