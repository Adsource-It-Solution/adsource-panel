import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { User } from "@/app/models/User";

export async function GET(req: Request) {
  console.log("🟡 [API] /api/admin/get-users called");

  const cookieHeader = req.headers.get("cookie");
  console.log("🍪 Cookie Header:", cookieHeader);

  const token = cookieHeader
    ?.split(";")
    ?.find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    console.log("🚫 No token provided. Returning 403");
    return NextResponse.json({ message: "Not authenticated" }, { status: 403 });
  }

  try {
    // ✅ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("✅ Token verified:", decoded);

    await dbConnect();

    // ✅ Restrict to admin only
    if ((decoded as any).role !== "admin") {
      console.log("🚫 Non-admin tried to access users list");
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    // ✅ Fetch all users
    const users = await User.find({}, "name email role createdAt createdByAdmin").lean();
    console.log(`✅ Found ${users.length} users`);

    // ✅ Count how many were created by admin
    const adminCreatedCount = await User.countDocuments({ createdByAdmin: true });
    console.log(`📊 Users created by admin: ${adminCreatedCount}`);

    // ✅ Return users and count
    return NextResponse.json(
      { success: true, users, totalUsers: users.length, adminCreatedCount },
      { status: 200 }
    );

  } catch (err) {
    console.error("❌ Invalid token or server error:", err);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
