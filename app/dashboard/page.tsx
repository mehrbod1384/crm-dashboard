import DashboardHero from "@/features/dashboard/components/DashboardHero";
import DashboardStatsGrid from "@/features/dashboard/components/DashboardStatsGrid";
import RecentCustomersCard from "@/features/dashboard/components/RecentCustomersCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHero />

      <DashboardStatsGrid />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <RecentCustomersCard />

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
