"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, UserPlus, BadgeCheck, Clock3 } from "lucide-react";

type Customer = {
  _id: string;
  name: string;
  phone: string;
  status: "NEW" | "CONTACTED" | "NEGOTIATION" | "WON" | "LOST";
  createdAt?: string;
};

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
        setCustomers(data.customers || []);
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

  const cards = [
    { label: "Total Customers", value: stats.total, icon: Users },
    { label: "New Leads", value: stats.newCount, icon: UserPlus },
    { label: "Contacted", value: stats.contacted, icon: Clock3 },
    { label: "Won", value: stats.won, icon: BadgeCheck },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-gradient-to-r from-indigo-900 to-indigo-700 p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          A clean workspace for managing customers, tracking follow-ups, and
          staying organized.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-2xl bg-slate-100 p-3">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
              </div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold">
                {loading ? "—" : card.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Customers</h2>
            <a
              href="/customers"
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              View all
            </a>
          </div>

          <div className="space-y-3">
            {customers.slice(0, 5).map((customer) => (
              <div
                key={customer._id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-slate-500">{customer.phone}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {customer.status}
                </span>
              </div>
            ))}

            {!loading && customers.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No customers yet
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
