import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { User } from "@/app/models/User";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  console.log("🟡 [API] /api/admin/delete-users called");

  // 🔹 Extract cookie
  const cookieHeader = req.headers.get("cookie");
  console.log("🍪 Cookie Header:", cookieHeader);

  const token = cookieHeader
    ?.split(";")
    ?.find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    console.log("🚫 No token provided. Returning 401");
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // 🔹 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("✅ Token verified:", decoded);

    // 🔹 Check admin privileges
    if ((decoded as any).role !== "admin") {
      console.log("🚫 Non-admin tried to delete user");
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    // 🔹 Connect DB
    await connectDB();

    // ✅ FIXED: await the params
    const { id } = await context.params;
    console.log(`🗑️ Deleting user with ID: ${id}`);

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("⚠️ User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("✅ User deleted successfully");
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Delete User Error:", err);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
