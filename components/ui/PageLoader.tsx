import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/90 backdrop-blur-md dark:bg-zinc-950/90">
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <LoaderCircle className="h-8 w-8 animate-spin text-slate-900 dark:text-white" />
        </div>

        <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-zinc-400">
          Loading...
        </p>
      </div>
    </div>
  );
}
