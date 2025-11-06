// app/lib/authMiddleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface DecodedUser {
  id: string;
  role: string;
  email: string;
}

export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized: Missing token", status: 401 };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedUser;
    return { user: decoded };
  } catch (err) {
    return { error: "Invalid or expired token", status: 403 };
  }
}

// ✅ For admin-only routes
export async function requireAdmin(req: NextRequest) {
  const result = await verifyToken(req);
  if (result.error) return result;

  if (result.user?.role !== "admin") {
    return { error: "Forbidden: Admins only", status: 403 };
  }

  return { user: result.user };
}
