import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// ✅ Role-based access map
const roleAccess: Record<string, string[]> = {
  admin: [
    "/admin-dashboard",
    "/user-dashboard/dashboard-ngo",
    "/user-dashboard/dashboard-solar",
    "/user-dashboard/dashboard-billing",
  ],
  ngo: [
    "/user-dashboard/dashboard-ngo",
    "/user-dashboard/dashboard-ngo/certificate",
    "/user-dashboard/dashboard-ngo/id",
    "/user-dashboard/dashboard-ngo/receipt",
  ],
  solar: [
    "/user-dashboard/dashboard-solar",
    "/user-dashboard/dashboard-solar/proposal",
    "/user-dashboard/dashboard-solar/proposal-list",
  ],
  billing: ["/user-dashboard/dashboard-billing"],
};

// ✅ Protected routes (excluding the main /user-dashboard)
const protectedRoutes: string[] = [
  "/admin-dashboard",
  "/user-dashboard/dashboard-ngo",
  "/user-dashboard/dashboard-solar",
  "/user-dashboard/dashboard-billing",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow public, static, and API routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // ✅ Allow the main /user-dashboard without login
  if (pathname === "/user-dashboard") {
    return NextResponse.next();
  }

  // 🛡️ Check if this is a protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.toLowerCase().startsWith(route.toLowerCase())
  );
  if (!isProtected) return NextResponse.next();

  // 🍪 Get JWT token
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    console.warn(`🚫 No JWT found for path: ${pathname}`);
    const url = req.nextUrl.clone();
    url.pathname = "/not-authenticated";
    return NextResponse.redirect(url);
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userRoles = Array.isArray(decoded.role)
      ? decoded.role.map((r: string) => r.toLowerCase())
      : [decoded.role.toLowerCase()];

    console.log("🟢 Verified token:", { email: decoded.email, roles: userRoles });

    // ✅ Check if user role matches allowed routes
    const isAllowed = userRoles.some((role: string) =>
      (roleAccess[role] || []).some((route: string) =>
        pathname.toLowerCase().startsWith(route.toLowerCase())
      )
    );

    if (!isAllowed) {
      console.warn(
        `🚫 Access denied: Roles [${userRoles.join(", ")}] → ${pathname}`
      );
      const url = req.nextUrl.clone();
      url.pathname = "/not-authenticated";
      return NextResponse.redirect(url);
    }

    console.log(`✅ Access granted: ${decoded.email} → ${pathname}`);
    return NextResponse.next();
  } catch (err: any) {
    console.error("❌ Invalid or expired JWT:", err.message);
    const url = req.nextUrl.clone();
    url.pathname = "/not-authenticated";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/user-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/dashboard/:path*",
    "/dashboard-ngo/:path*",
    "/dashboard-solar/:path*",
    "/dashboard-billing/:path*",
  ],
};
