"use client";

import Link from "next/link";
import type { Customer } from "@/features/dashboard/utils/types";
import {
  statusLabel,
  statusStyles,
  safeDateLabel,
} from "@/features/dashboard/utils/utils";
import { useDashboard } from "../hook/useDashboard";

export default function RecentCustomersCard() {
  const { data: customersData, isLoading } = useDashboard();

  if (isLoading)
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
              Recent Customers
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              A quick look at the latest entries.
            </p>
          </div>

          <Link
            href="/dashboard/customers"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between animate-pulse rounded-2xl border border-slate-200 px-4 py-3 dark:border-zinc-800"
            >
              <div>
                <div className="h-4 w-32 rounded bg-slate-100 dark:bg-zinc-800" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100 dark:bg-zinc-800" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100 dark:bg-zinc-800" />
              </div>

              <div className="h-5 w-24 rounded-xl bg-slate-100 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </section>
    );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
            Recent Customers
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            A quick look at the latest entries.
          </p>
        </div>

        <Link
          href="/dashboard/customers"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {customersData.recentCustomers?.length > 0 ? (
          customersData.recentCustomers.map((customer: Customer) => (
            <div
              key={customer._id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 dark:border-zinc-800"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900 dark:text-zinc-100">
                  {customer.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {customer.phone}
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
                  {safeDateLabel(customer.createdAt)}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[customer.status]}`}
              >
                {statusLabel(customer.status)}
              </span>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No customers yet
          </p>
        )}
      </div>
    </section>
  );
}
