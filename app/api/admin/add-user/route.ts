import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/db";
import { User } from "@/app/models/User";

export async function POST(req: NextRequest) {
  try {
    console.log("🟡 [Admin API] Add User called");

    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.warn("❌ No token found in cookies");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify admin token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload.role !== "admin") {
      console.warn("🚫 Forbidden: Non-admin tried to add user");
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    console.log("✅ MongoDB connected for Add User");

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      console.warn("⚠️ Missing required fields");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("⚠️ Duplicate email detected:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      createdByAdmin: true,
    });

    console.log("✅ New user added successfully:", {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    return NextResponse.json({
      success: true,
      message: "User added successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err: any) {
    console.error("❌ Add User Error:", err.message || err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
