// app/api/user/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/db";
import { User } from "@/app/models/User";
import { verifyToken } from "@/app/lib/authMiddleware";

export async function PATCH(req: NextRequest) {
  const auth = await verifyToken(req);

  if ("error" in auth)
    return NextResponse.json({ message: auth.error }, { status: auth.status });

  await connectDB();

  const { name, password } = await req.json();
  const updateData: any = {};
  if (name) updateData.name = name;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(auth.user.id, updateData);

  return NextResponse.json({ message: "Profile updated successfully" });
}
