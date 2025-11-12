import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Brand from "@/app/models/brand";

// ====================== POST ======================
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, logo, category } = await req.json();

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 }
      );
    }

    // ✅ Check for duplicate brand in the same category
    const existingBrand = await Brand.findOne({ name, category });
    if (existingBrand) {
      return NextResponse.json(
        { error: "Brand already exists in this category" },
        { status: 400 }
      );
    }

    const brand = new Brand({ name, logo, category });
    await brand.save();

    return NextResponse.json(brand, { status: 201 });
  } catch (err: any) {
    console.error("POST /brands error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// ====================== GET ======================
export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    await dbConnect();

    const { category } = params;
    console.log("Fetching brands for category:", category);

    const brands = await Brand.find({ category });
    return NextResponse.json(brands, { status: 200 });
  } catch (err: any) {
    console.error("GET /brands error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
