import { getCurrentUser } from "@/lib/auth-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }
  redirect("/auth/login");
}
