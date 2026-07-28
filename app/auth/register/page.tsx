import AuthForm from "@/features/auth/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center dark:bg-zinc-950 bg-gray-50 px-4">
      <AuthForm mode="register" />
    </main>
  );
}
