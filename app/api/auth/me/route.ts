import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // ✅ Ensure role is always an array
    const role = Array.isArray(decoded.role)
      ? decoded.role
      : [decoded.role];

    return NextResponse.json({
      id: decoded.id,
      email: decoded.email,
      role,
    });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
