import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { User } from "@/app/models/User";
import  Proposal  from "@/app/models/Proposal";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // ✅ 1️⃣ Connect to MongoDB
    await connectDB();

    // ✅ 2️⃣ Extract token from cookie
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.warn("🚫 No token found in cookies");
      return NextResponse.json({ message: "No token provided" }, { status: 403 });
    }

    // ✅ 3️⃣ Verify token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
      console.error("❌ Invalid or expired token:", err);
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
    }

    // ✅ 4️⃣ Get user
    const userId = decoded.id || decoded._id;
    if (!userId) {
      console.error("⚠️ Token missing user ID");
      return NextResponse.json({ message: "Invalid token payload" }, { status: 400 });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      console.warn(`🚫 User not found for ID: ${userId}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ 5️⃣ Fetch proposals linked to user
    const proposals = await Proposal.find({ createdBy: user._id });

    const approved = proposals.filter((p) => p.status === "Approved").length;
    const pending = proposals.filter((p) => p.status === "Pending").length;
    const inReview = proposals.filter((p) => p.status === "In Review").length;

    // ✅ 6️⃣ Generate PDF stats dynamically
    const pdfStats = await Proposal.aggregate([
      { $match: { createdBy: user._id } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // ✅ 7️⃣ Build clean response
    return NextResponse.json({
      user,
      stats: {
        totalProposals: proposals.length,
        approved,
        pending,
        inReview,
        pdfGenerated: user.pdfCount ?? 0,
        maxPdfs: user.maxPdfs ?? 100,
      },
      pdfGenerationData: pdfStats.map((d) => ({
        month: new Date(2025, d._id - 1).toLocaleString("default", { month: "short" }),
        count: d.count,
      })),
      proposals: proposals.slice(0, 5), // recent 5
    });
  } catch (err: any) {
    console.error("💥 [Profile API] Server Error:", err);
    return NextResponse.json({ message: "Server error while fetching profile" }, { status: 500 });
  }
}
