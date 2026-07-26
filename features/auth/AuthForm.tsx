"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import type { z } from "zod";
import { loginSchema, registerSchema } from "@/features/auth/authSchema";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const form = useForm<LoginValues & Partial<RegisterValues>>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: LoginValues & Partial<RegisterValues>) => {
    try {
      setLoading(true);

      const url = isLogin ? "/api/auth/login" : "/api/auth/register";

      const payload = isLogin
        ? {
            email: values.email,
            password: values.password,
          }
        : {
            name: values.name,
            email: values.email,
            password: values.password,
          };

      console.log(payload);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      toast.success(
        data.message || (isLogin ? "Login successful" : "Account created"),
      );

      if (isLogin) {
        router.push("/");
        router.refresh();
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isLogin
            ? "Sign in to continue to your CRM"
            : "Create your account to start using CRM"}
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              {...form.register("name")}
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="Mehrbod"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            {...form.register("email")}
            className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="name@email.com"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="••••••••"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...form.register("confirmPassword")}
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
            {form.formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl mt-4 bg-indigo-500 hover:bg-indigo-600 px-4 py-2.5 font-medium text-white disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
        {isLogin ? "No account yet?" : "Already have an account?"}{" "}
        <a
          href={isLogin ? "/auth/register" : "/auth/login"}
          className="font-medium text-black dark:text-gray-300 underline underline-offset-4"
        >
          {isLogin ? "Create one" : "Sign in"}
        </a>
      </p>
    </div>
  );
}
