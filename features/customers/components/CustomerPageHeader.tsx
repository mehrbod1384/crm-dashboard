"use client";

import { Plus } from "lucide-react";

export default function CustomerPageHeader({
  onAddCustomer,
}: {
  onAddCustomer: () => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-[28px] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
            Customers
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-3xl">
            Customer management
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-zinc-400">
            Simple table, quick actions, and a clean workflow.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddCustomer}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add customer
        </button>
      </div>
    </section>
  );
}
