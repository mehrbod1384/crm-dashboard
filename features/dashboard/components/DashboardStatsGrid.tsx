import { BadgeCheck, Clock3, UserPlus, Users } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";

type Props = {
  total: number;
  newCount: number;
  contacted: number;
  won: number;
  loading?: boolean;
};

export default function DashboardStatsGrid({
  total,
  newCount,
  contacted,
  won,
  loading = false,
}: Props) {
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
        <DashboardStatCard key={card.label} {...card} loading={loading} />
      ))}
    </section>
  );
}
