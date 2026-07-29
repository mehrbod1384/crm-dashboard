"use client";

import { CalendarDays, LogOut } from "lucide-react";
import { format } from "date-fns";

import { useProfile } from "../hooks/useProfile";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function AccountCard() {
  const { data, isLoading } = useProfile();

  const { logoutMutation, isLogingOut } = useLogout();

  if (isLoading) {
    return <AccountSkeleton />;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Account
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
          Information about your account.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Member Since
            </p>

            <p className="text-sm text-slate-500 dark:text-zinc-400">
              {format(new Date(data.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => logoutMutation()}
          disabled={isLogingOut}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
        >
          <LogOut size={18} />
          {isLogingOut ? "loging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

function AccountSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8">
        <div className="h-5 w-24 rounded bg-slate-200 dark:bg-zinc-800" />

        <div className="mt-3 h-4 w-52 rounded bg-slate-200 dark:bg-zinc-800" />
      </div>

      <div className="h-20 rounded-2xl bg-slate-200 dark:bg-zinc-800" />

      <div className="mt-8 flex justify-end">
        <div className="h-11 w-36 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
