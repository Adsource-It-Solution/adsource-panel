import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import connectDB from "@/app/lib/db";
import { User } from "@/app/models/User";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    // ✅ Await params since it's a Promise in Next.js 15+
    const { id } = await context.params;

    // ✅ Verify Admin Token
    const token = req.cookies.get("token")?.value || req.cookies.get("adminToken")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No token" }, { status: 401 });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload.role !== "admin") {
      console.warn("🚫 Forbidden: Non-admin tried to update user");
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ✅ Parse request body
    const body = await req.json();
    const { name, email, password, role } = body;

    // ✅ Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // ✅ Update fields
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (role) existingUser.role = role;

    // ✅ Hash password if updated
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error: any) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
