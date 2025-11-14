import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Company from "@/app/models/UserCompany";

// ✅ GET Company Details
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> }
) {
  const { userid } = await context.params;
  await dbConnect();

  try {
    const company = await Company.findOne({ userId: userid });

    if (!company) {
      return NextResponse.json(
        { success: false, message: "No company found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, company });
  } catch (error) {
    console.error("❌ Error fetching company:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching company details" },
      { status: 500 }
    );
  }
}

// ✅ POST - Create company
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> }
) {
  const { userid } = await context.params;
  await dbConnect();

  try {
    const body = await req.json();
    const {
      name,
      address,
      logo,
      registrationNumber,
      panNumber,
      gstNumber,
      email,
      contactNumber,
      website,
    } = body;

    if (!userid) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    let existingCompany = await Company.findOne({ userId: userid });

    if (existingCompany) {
      // ✅ Update all fields safely
      existingCompany.name = name ?? existingCompany.name;
      existingCompany.address = address ?? existingCompany.address;
      existingCompany.logo = logo ?? existingCompany.logo;
      existingCompany.registrationNumber = registrationNumber ?? existingCompany.registrationNumber;
      existingCompany.panNumber = panNumber ?? existingCompany.panNumber;
      existingCompany.gstNumber = gstNumber ?? existingCompany.gstNumber;
      existingCompany.email = email ?? existingCompany.email;
      existingCompany.contactNumber = contactNumber ?? existingCompany.contactNumber;
      existingCompany.website = website ?? existingCompany.website;

      await existingCompany.save();

      return NextResponse.json({ success: true, company: existingCompany });
    }

    // 🆕 Create new if not exists
    const newCompany = await Company.create({
      userId: userid,
      name,
      address,
      logo,
      registrationNumber,
      panNumber,
      gstNumber,
      email,
      contactNumber,
      website,
    });

    return NextResponse.json({ success: true, company: newCompany });
  } catch (error) {
    console.error("❌ Error saving company:", error);
    return NextResponse.json(
      { success: false, message: "Error saving company" },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update existing company
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> }
) {
  const { userid } = await context.params;
  await dbConnect();

  try {
    const body = await req.json();
    const updatedCompany = await Company.findOneAndUpdate(
      { userId: userid },
      { $set: body },
      { new: true }
    );

    if (!updatedCompany) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, company: updatedCompany });
  } catch (error) {
    console.error("❌ Error updating company:", error);
    return NextResponse.json(
      { success: false, message: "Error updating company details" },
      { status: 500 }
    );
  }
}
