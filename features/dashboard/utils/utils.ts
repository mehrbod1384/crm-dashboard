import type { CustomerStatus } from "./types";

export const statusStyles: Record<CustomerStatus, string> = {
  NEW:
    "bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900/60",
  CONTACTED:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60",
  NEGOTIATION:
    "bg-violet-50 text-violet-700 ring-1 ring-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900/60",
  WON:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/60",
  LOST:
    "bg-rose-50 text-rose-700 ring-1 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900/60",
};

export function statusLabel(value: CustomerStatus) {
  switch (value) {
    case "NEW":
      return "New";
    case "CONTACTED":
      return "Contacted";
    case "NEGOTIATION":
      return "Negotiation";
    case "WON":
      return "Won";
    case "LOST":
      return "Lost";
    default:
      return value;
  }
}

export function safeDateLabel(date?: string) {
  if (!date) return "Recently";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recently";
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.round((parsed.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    "day"
  );
}
