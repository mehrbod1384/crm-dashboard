"use client";

import { Menu, Search } from "lucide-react";
import type { AuthUser } from "@/lib/auth-user";

export default function Topbar({
  user,
  onMenuClick,
}: {
  user: AuthUser;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenuClick}
          className="rounded-2xl p-2 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1">
          <h2 className="text-sm font-medium text-slate-500">Welcome back</h2>
          <p className="text-lg font-semibold">{user.name}</p>
        </div>

        <div className="hidden w-full max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 lg:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            disabled
            placeholder="Search customers..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  );
}
