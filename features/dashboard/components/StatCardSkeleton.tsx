import { Skeleton } from "@/components/ui/Skeleton";

function StatCardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border flex items-center gap-6 border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="w-17 h-15 rounded-2xl" />
            <div className="space-y-3">
              <Skeleton className="w-10 h-4 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCardSkeleton;
