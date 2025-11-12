"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import { CircularProgress, Box } from "@mui/material";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Example: checking token from localStorage or cookie
    const token = localStorage.getItem("token");

    if (!token) {
      // 🚫 If no token → redirect to login
      router.push("/login");
    } else {
      // ✅ Token exists → allow access
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    // ⏳ Show loading spinner while checking auth
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) return null;

  // ✅ Render actual dashboard layout if authenticated
  return <DashboardLayout>{children}</DashboardLayout>;
}
