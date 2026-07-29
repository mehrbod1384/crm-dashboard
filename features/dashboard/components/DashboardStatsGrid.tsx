"use client";

import { BadgeCheck, Clock3, UserPlus, Users } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";
import StatCardSkeleton from "./StatCardSkeleton";
import { useDashboard } from "../hook/useDashboard";

export default function DashboardStatsGrid() {
  const { data: customersData, isLoading } = useDashboard();

  if (isLoading) return <StatCardSkeleton />;

  const { total, newCount, contacted, won } = customersData;

  const cards = [
    {
      label: "Total Customers",
      value: total,
      icon: Users,
      accentClassName: "bg-indigo-600",
    },
    {
      label: "New Leads",
      value: newCount,
      icon: UserPlus,
      accentClassName: "bg-sky-600",
    },
    {
      label: "Contacted",
      value: contacted,
      icon: Clock3,
      accentClassName: "bg-amber-600",
    },
    {
      label: "Won",
      value: won,
      icon: BadgeCheck,
      accentClassName: "bg-emerald-600",
    },
  ] as const;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <DashboardStatCard key={card.label} {...card} />
      ))}
    </section>
  );
}
