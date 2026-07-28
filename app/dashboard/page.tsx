"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardHero from "@/features/dashboard/components/DashboardHero";
import DashboardStatsGrid from "@/features/dashboard/components/DashboardStatsGrid";
import RecentCustomersCard from "@/features/dashboard/components/RecentCustomersCard";
import type { Customer } from "@/features/dashboard/utils/types";

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/customers", {
          credentials: "include",
        });

        const data = await res.json();
        setCustomers((data.data || data.customers || []) as Customer[]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const total = customers.length;
    const newCount = customers.filter((c) => c.status === "NEW").length;
    const contacted = customers.filter((c) => c.status === "CONTACTED").length;
    const won = customers.filter((c) => c.status === "WON").length;

    return { total, newCount, contacted, won };
  }, [customers]);

  return (
    <div className="space-y-6">
      <DashboardHero />

      <DashboardStatsGrid
        total={stats.total}
        newCount={stats.newCount}
        contacted={stats.contacted}
        won={stats.won}
        loading={loading}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <RecentCustomersCard customers={customers} loading={loading} />

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
            Quick Notes
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-zinc-300">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-zinc-900">
              Keep your follow-ups short and consistent.
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-zinc-900">
              New leads should be reviewed every day.
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-zinc-900">
              Use the customers page for CRUD and details.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
