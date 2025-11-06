import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, logo, category } = await req.json();

    // ✅ Check duplicate brand in same category
    const exists = await Brand.findOne({ name, category });
    if (exists) {
      return NextResponse.json(
        { error: "Brand already exists in this category" },
        { status: 400 }
      );
    }

    const brand = new Brand({ name, logo, category });
    await brand.save();

    return NextResponse.json(brand, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
