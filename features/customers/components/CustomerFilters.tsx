"use client";

import { Search } from "lucide-react";
import { customerStatusOptions } from "@/features/customers/utils/customer.constants";
import type { CustomerStatus } from "@/features/customers/utils/customer.types";

export default function CustomerFilters({
  search,
  onSearchChange,
  activeStatus,
  onStatusChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  activeStatus: CustomerStatus | "ALL";
  onStatusChange: (value: CustomerStatus | "ALL") => void;
}) {
  return (
    <section className=" bg-white p-4 dark:bg-zinc-950 sm:rounded-[28px] sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
            List
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Search, filter, and manage customers.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-70">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-slate-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-900"
              placeholder="Search..."
            />
          </div>

          <select
            value={activeStatus}
            onChange={(e) =>
              onStatusChange(e.target.value as CustomerStatus | "ALL")
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:bg-zinc-900 sm:w-auto"
          >
            <option value="ALL">All status</option>
            {customerStatusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
