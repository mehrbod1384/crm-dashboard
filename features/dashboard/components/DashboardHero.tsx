import { Sparkles } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6 dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 p-6 text-white shadow-sm dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="relative flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            CRM Dashboard
          </span>

          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              A clean workspace for managing customers and follow-ups.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100/90 dark:text-zinc-300">
              Keep track of new leads, recent activity, and the customers that need attention now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
