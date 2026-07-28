"use client";

import { type FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { useSaveCustomer } from "@/features/customers/hooks/useSavetCustomer";
import { useDeleteCustomer } from "@/features/customers/hooks/useDeleteCustomer";

import CustomerPageHeader from "@/features/customers/components/CustomerPageHeader";
import CustomerFilters from "@/features/customers/components/CustomerFilters";
import CustomerList from "@/features/customers/components/CustomerList";
import CustomerFormModal from "@/features/customers/components/CustomerFormModal";
import CustomerDetailsModal from "@/features/customers/components/CustomerDetailsModal";

import type {
  Customer,
  CustomerFormState,
  CustomerStatus,
} from "@/features/customers/utils/customer.types";
import { filterCustomers } from "@/features/customers/utils/customer.utils";

const initialForm: CustomerFormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  status: "NEW",
  notes: "",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<CustomerStatus | "ALL">(
    "ALL",
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CustomerFormState>(initialForm);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [detailsCustomer, setDetailsCustomer] = useState<Customer | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const { data: customers = [], isLoading, isError } = useCustomers();
  const deleteMutation = useDeleteCustomer();

  const filteredCustomers = useMemo(() => {
    return filterCustomers(customers, search, activeStatus);
  }, [customers, search, activeStatus]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setFormModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setOpenMenuId(null);
    setEditingId(customer._id);
    setForm({
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      company: customer.company || "",
      status: customer.status || "NEW",
      notes: customer.notes || "",
    });
    setFormModalOpen(true);
  };

  const saveMutation = useSaveCustomer(() => {
    setFormModalOpen(false);
    resetForm();
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone are required");
      return;
    }

    saveMutation.mutate({ id: editingId ?? undefined, form });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <CustomerPageHeader onAddCustomer={openCreateModal} />

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-[28px] sm:p-5">
        <CustomerFilters
          search={search}
          onSearchChange={setSearch}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />

        {isError ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-slate-900 dark:text-zinc-100">
              Could not load customers
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
              Please try again.
            </p>
          </div>
        ) : (
          <CustomerList
            loading={isLoading}
            customers={filteredCustomers}
            openMenuId={openMenuId}
            onToggleMenu={(id) =>
              setOpenMenuId((prev) => (prev === id ? null : id))
            }
            onDetails={(customer) => {
              setDetailsCustomer(customer);
              setOpenMenuId(null);
            }}
            onEdit={openEditModal}
            onDelete={deleteMutation.mutate}
            isDeleting={deleteMutation.isPending}
          />
        )}
      </section>

      <CustomerFormModal
        open={formModalOpen}
        mode={editingId ? "edit" : "create"}
        form={form}
        submitting={saveMutation.isPending}
        onClose={() => {
          setFormModalOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        onChange={setForm}
      />

      <CustomerDetailsModal
        open={Boolean(detailsCustomer)}
        customer={detailsCustomer}
        onClose={() => setDetailsCustomer(null)}
      />
    </div>
  );
}
