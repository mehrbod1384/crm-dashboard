"use client";

import type { FormEvent, Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/Modal";

export type CustomerStatus =
  | "NEW"
  | "CONTACTED"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export type CustomerFormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  status: CustomerStatus;
  notes: string;
};

const statusOptions: { label: string; value: CustomerStatus }[] = [
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Negotiation", value: "NEGOTIATION" },
  { label: "Won", value: "WON" },
  { label: "Lost", value: "LOST" },
];

type Props = {
  open: boolean;
  mode: "create" | "edit";
  form: CustomerFormState;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: Dispatch<SetStateAction<CustomerFormState>>;
};

export default function CustomerFormModal({
  open,
  mode,
  form,
  submitting,
  onClose,
  onSubmit,
  onChange,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      description={mode === "edit" ? "Edit customer" : "Create customer"}
      title={mode === "edit" ? "Update details" : "Add a new customer"}
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Name *"
            value={form.name}
            onChange={(value) => onChange((p) => ({ ...p, name: value }))}
            placeholder="Ali Rezaei"
          />
          <Input
            label="Phone *"
            value={form.phone}
            onChange={(value) => onChange((p) => ({ ...p, phone: value }))}
            placeholder="09120000000"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            value={form.email}
            onChange={(value) => onChange((p) => ({ ...p, email: value }))}
            placeholder="name@email.com"
          />
          <Input
            label="Company"
            value={form.company}
            onChange={(value) => onChange((p) => ({ ...p, company: value }))}
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-200">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              onChange((p) => ({
                ...p,
                status: e.target.value as CustomerFormState["status"],
              }))
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:bg-zinc-900"
          >
            {statusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-200">
            Notes
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => onChange((p) => ({ ...p, notes: e.target.value }))}
            className="min-h-30 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:bg-zinc-900"
            placeholder="Short note..."
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {submitting
              ? "Saving..."
              : mode === "edit"
                ? "Update customer"
                : "Create customer"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-200">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-900"
        placeholder={placeholder}
      />
    </div>
  );
}
