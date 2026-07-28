"use client";

import { CircleUserRound, Menu } from "lucide-react";
import type { AuthUser } from "@/lib/auth-user";
import ThemeButton from "../ui/ThemeButton";

export default function Topbar({
  user,
  onMenuClick,
}: {
  user: AuthUser;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenuClick}
          className="rounded-2xl p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:text-zinc-200 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
              <CircleUserRound className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-medium text-slate-500 dark:text-zinc-300">
                Welcome back
              </h2>
              <p className="truncate text-lg dark:text-zinc-200 font-semibold">
                {user.name}
              </p>
            </div>
          </div>
        </div>

        <ThemeButton />
      </div>
    </header>
  );
}
