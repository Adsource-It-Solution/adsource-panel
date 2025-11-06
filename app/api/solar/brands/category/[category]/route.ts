import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

export async function GET(req: Request, { params }: { params: { category: string } }) {
  try {
    await dbConnect();
    const { category } = params;

    const brands = await Brand.find({ category });
    return NextResponse.json(brands);
  } catch (err: any ) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
