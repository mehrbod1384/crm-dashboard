"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  CircleUserRound,
} from "lucide-react";
import type { AuthUser } from "@/lib/auth-user";
import { useLogout } from "@/features/auth/hooks/useLogout";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({
  user,
  mobileOpen,
  onClose,
}: {
  user: AuthUser;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { logoutMutation, isLogingOut } = useLogout();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-5 transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:fixed`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight dark:text-zinc-100">
              FlowCRM
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-300">
              Simple CRM workspace
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col h-190 justify-between">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.endsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block rounded-3xl bg-slate-100 dark:bg-zinc-900 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <CircleUserRound className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm dark:text-zinc-200 font-semibold">
                  {user.name}
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-300">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => logoutMutation()}
              disabled={isLogingOut}
              className="mt-4 flex w-full font-semibold items-center justify-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 disabled:opacity-60 disabled:bg-indigo-600 px-4 py-2.5 text-sm text-slate-700 dark:text-zinc-300 hover:bg-indigo-600 hover:text-zinc-100"
            >
              <LogOut className="h-4 w-4" />
              {isLogingOut ? "Loging out..." : "Logout"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
