"use client";

import AdminDashboard from "@/app/components/AdminLayout"

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashboard>{children}</AdminDashboard>;
}
