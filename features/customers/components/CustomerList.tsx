"use client";

import { CalendarDays, Mail, Phone, UserRound } from "lucide-react";
import CustomerActionsMenu from "@/features/customers/components/CustomerActionsMenu";
import {
  customerStatusLabel,
  customerStatusStyles,
} from "@/features/customers/utils/customer.constants";
import { safeDateLabel } from "@/features/customers/utils/customer.utils";
import type { Customer } from "@/features/customers/utils/customer.types";
import CustomerLoadingState from "./CustomerLoadingState";
import { useState } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Props = {
  loading: boolean;
  customers: Customer[];
  openMenuId: string | null;
  onToggleMenu: (id: string) => void;
  onDetails: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: any;
  isDeleting: boolean;
};

export default function CustomerList({
  loading,
  customers,
  onDetails,
  onEdit,
  onDelete,
  isDeleting,
}: Props) {
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);

  if (loading) {
    return <CustomerLoadingState />;
  }

  if (customers.length === 0) {
    return (
      <div className="rounded-3xl mt-4 border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center sm:py-14 dark:border-zinc-800 dark:bg-zinc-900">
        <UserRound className="mx-auto h-8 w-8 text-slate-400 dark:text-zinc-500" />
        <p className="mt-4 text-sm font-medium text-slate-900 dark:text-zinc-100">
          No customers found
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
          Add a customer or change your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden border mt-4 border-slate-200 dark:border-zinc-700 md:block">
        <div className="max-h-[calc(100vh-360px)] min-h-80 overflow-y-auto">
          <table className="w-full divide-y  divide-slate-200 dark:divide-zinc-700">
            <thead className="bg-slate-50 dark:bg-zinc-900">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y  divide-slate-100 bg-white dark:divide-zinc-700 dark:bg-zinc-950">
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900 dark:text-zinc-100">
                      {customer.name}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-1 text-sm text-slate-600 dark:text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                        {customer.phone}
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                          {customer.email}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-zinc-300">
                    {customer.company || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${customerStatusStyles[customer.status]}`}
                    >
                      {customerStatusLabel(customer.status)}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                      {safeDateLabel(customer.createdAt)}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <CustomerActionsMenu
                      onDetails={() => onDetails(customer)}
                      onEdit={() => onEdit(customer)}
                      onDelete={() => setDeleteCustomer(customer)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden max-h-[calc(100vh-360px)] min-h-80 overflow-y-auto">
        {customers.map((customer) => (
          <div
            key={customer._id}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-slate-900 dark:text-zinc-100">
                  {customer.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  {safeDateLabel(customer.createdAt)}
                </p>
              </div>

              <CustomerActionsMenu
                onDetails={() => onDetails(customer)}
                onEdit={() => onEdit(customer)}
                onDelete={() => onDelete(customer)}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${customerStatusStyles[customer.status]}`}
              >
                {customerStatusLabel(customer.status)}
              </span>
              {customer.company && (
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {customer.company}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                {customer.phone}
              </div>
              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                  {customer.email}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!deleteCustomer}
        loading={isDeleting}
        title="Delete customer?"
        description={`"${deleteCustomer?.name}" will be permanently deleted. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onCancel={() => setDeleteCustomer(null)}
        onConfirm={() => {
          onDelete(deleteCustomer?._id, {
            onSuccess: () => setDeleteCustomer(null),
          });
        }}
      />
    </>
  );
}
