"use client";

import DashboardLayout from "@/app/components/DashboardLayout";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
