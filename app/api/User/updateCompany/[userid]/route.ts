import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Company from "@/app/models/UserCompany";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> }
) {
  const { userid } = await context.params;
  await dbConnect();

  try {
    // console.log("📥 GET request received for company of user:", userid);

    const company = await Company.findOne({ userId: userid });

    if (!company) {
      // console.log("⚠️ No company found for user:", userid);
      return NextResponse.json(
        { success: false, message: "No company found for this user" },
        { status: 404 }
      );
    }

    // console.log("✅ Company found:", company);
    return NextResponse.json({ success: true, company });
  } catch (error) {
    console.error("❌ Error fetching company:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching company details" },
      { status: 500 }
    );
  }
}

// ✅ Create or Update company details
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> }
) {
  const { userid } = await context.params; // 👈 await here too
  // console.log("🟢 Route hit — userId:", userid);
  await dbConnect();

  try {
    const body = await req.json();
    const { name, address, logo, registrationNumber, panNumber, gstNumber, email, contactNumber, website } = body;
    // console.log("📦 Request body:", body);

    if (!userid) {
      // console.error("❌ Missing userId in route params");
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    let existingCompany = await Company.findOne({ userId: userid });

    if (existingCompany) {
      // console.log("🛠 Updating existing company for user:", userid);
      existingCompany.contactNumber = contactNumber;
      existingCompany.registrationNumber = registrationNumber;
      existingCompany.panNumber = panNumber;
      existingCompany.gstNumber = gstNumber;
      await existingCompany.save();
      return NextResponse.json({ success: true, company: existingCompany });
    }

    // console.log("🆕 Creating new company for user:", userid);

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
      website
    });

    // console.log("✅ New company saved:", newCompany);

    return NextResponse.json({ success: true, company: newCompany });
  } catch (error) {
    console.error("❌ Error saving company:", error);
    return NextResponse.json(
      { success: false, message: "Error saving company" },
      { status: 500 }
    );
  }
}
