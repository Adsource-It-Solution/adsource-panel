import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/db";
import { User } from "@/app/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("🟢 Login attempt received:", { email });

    if (!email || !password) {
      console.warn("⚠️ Missing credentials");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Admin Login (from environment)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log("👑 Admin login detected:", ADMIN_EMAIL);

      const token = jwt.sign(
        { role: "admin", email: ADMIN_EMAIL },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      console.log("✅ Admin JWT created successfully");

      // ✅ Create response and set cookie
      const response = NextResponse.json({
        message: "Admin login successful",
        role: "admin",
        user: {
          name: "Admin",
          email: ADMIN_EMAIL,
          role: "admin",
          pdfCount: 0,
          lastLogin: new Date(),
        },
      });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      console.log("🍪 Admin token cookie set successfully");
      return response;
    }

    // ✅ Regular User Login
    console.log("🧩 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected");

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("❌ User not found:", email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("👤 User found:", { id: user._id, role: user.role });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match result:", isMatch);

    if (!isMatch) {
      console.warn("❌ Invalid password for:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Update last login timestamp
    user.lastLogin = new Date();
    await user.save();
    console.log("🕒 Updated last login for:", email);

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ JWT created for user:", { email, role: user.role });

    // ✅ Create response and set cookie
    const response = NextResponse.json({
      message: "Login successful",
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        pdfCount: user.pdfCount,
        lastLogin: user.lastLogin,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    console.log("🍪 Token cookie set for user:", email);
    return response;
  } catch (err: any) {
    console.error("❌ Login Error:", err.message, err.stack);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
