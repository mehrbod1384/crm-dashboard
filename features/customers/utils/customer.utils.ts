import { formatDistanceToNow } from "date-fns";

export function safeDateLabel(date?: string) {
  if (!date) return "Recently";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recently";

  return formatDistanceToNow(parsed, { addSuffix: true });
}

export function filterCustomers(
  customers: any,
  search: string,
  activeStatus: string,
) {
  const q = search.trim().toLowerCase();

  return customers.filter((customer) => {
    const matchesSearch =
      !q ||
      customer.name.toLowerCase().includes(q) ||
      customer.phone.toLowerCase().includes(q) ||
      (customer.company || "").toLowerCase().includes(q) ||
      (customer.email || "").toLowerCase().includes(q);

    const matchesStatus =
      activeStatus === "ALL" ? true : customer.status === activeStatus;

    return matchesSearch && matchesStatus;
  });
}
