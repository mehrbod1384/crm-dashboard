"use client";

import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Mail, Phone } from "lucide-react";
import Modal from "@/components/ui/Modal";
import type { CustomerStatus } from "./CustomerFormModal";

export type Customer = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  status: CustomerStatus;
  notes?: string;
  createdAt?: string;
};

export default function CustomerDetailsModal({
  open,
  customer,
  onClose,
}: {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}) {
  if (!customer) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      description="Customer details"
      title={customer.name}
      maxWidthClassName="max-w-lg"
    >
      <div className="space-y-3">
        <DetailRow
          label="Phone"
          value={customer.phone}
          icon={<Phone className="h-4 w-4" />}
        />
        <DetailRow
          label="Email"
          value={customer.email || "—"}
          icon={<Mail className="h-4 w-4" />}
        />
        <DetailRow label="Company" value={customer.company || "—"} />
        <DetailRow label="Status" value={customer.status} />
        <DetailRow
          label="Created"
          value={
            customer.createdAt
              ? formatDistanceToNow(new Date(customer.createdAt), {
                  addSuffix: true,
                })
              : "Recently"
          }
          icon={<CalendarDays className="h-4 w-4" />}
        />
        <DetailRow label="Notes" value={customer.notes || "—"} />
      </div>
    </Modal>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-slate-400 dark:text-zinc-400">{icon}</span>
        )}
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          {label}
        </p>
      </div>
      <p className="mt-1 wrap-break-word text-sm text-slate-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}
