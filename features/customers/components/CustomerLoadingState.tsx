"use client";

export default function CustomerLoadingState() {
  return (
    <>
      <div className="hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950 md:block">
        <div className="animate-pulse">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
          </div>

          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid items-center grid-cols-6 gap-4 border-b border-slate-100 px-5 py-4 dark:border-zinc-800"
              >
                <div className="h-4 w-30 lg:w-40 rounded bg-slate-200 dark:bg-zinc-700" />
                <div className="space-y-1">
                  <div className="h-3 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
                  <div className="h-3 w-32 rounded bg-slate-200 dark:bg-zinc-700" />
                </div>
                <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-zinc-700" />
                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-zinc-700" />
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
                <div className="ml-auto h-10 w-10 rounded-2xl bg-slate-200 dark:bg-zinc-700" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            <div className="animate-pulse">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-2">
                  <div className="h-4 w-36 rounded bg-slate-200 dark:bg-zinc-700" />
                  <div className="h-3 w-24 rounded bg-slate-200 dark:bg-zinc-700" />
                </div>
                <div className="h-10 w-10 rounded-2xl bg-slate-200 dark:bg-zinc-700" />
              </div>

              <div className="mt-4 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-zinc-700" />
                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-zinc-700" />
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-4 w-28 rounded bg-slate-200 dark:bg-zinc-700" />
                <div className="h-4 w-36 rounded bg-slate-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
