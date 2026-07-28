import { getCurrentUser } from "@/lib/auth-user";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  } else {
    redirect("/dashboard");
  }
}
