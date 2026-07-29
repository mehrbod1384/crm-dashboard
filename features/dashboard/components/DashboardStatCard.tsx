import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number;
  icon: LucideIcon;
  accentClassName: string;
};

export default function DashboardStatCard({
  label,
  value,
  icon: Icon,
  accentClassName,
}: Props) {
  return (
    <div className="rounded-3xl border flex items-center gap-6 border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`rounded-2xl p-3 text-white shadow-sm ${accentClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-zinc-400">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          {value}
        </p>
      </div>
    </div>
  );
}
