import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-user";
import DashboardShell from "@/components/layout/DashboardShell";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
