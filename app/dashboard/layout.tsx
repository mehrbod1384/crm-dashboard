"use client";

import { redirect } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import { useProfile } from "@/features/settings/hooks/useProfile";
import PageLoader from "@/components/ui/PageLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useProfile();

  if (isLoading) return <PageLoader />;

  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
