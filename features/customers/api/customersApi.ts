import api from "@/lib/axios";
import type { Customer, CustomerFormState } from "../utils/customer.types";

export async function fetchCustomers(): Promise<Customer[]> {
  const res = await api.get("/customers");
  const data = res.data;

  return Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.customers)
      ? data.customers
      : [];
}

export async function createCustomer(form: CustomerFormState) {
  const res = await api.post("/customers", form);
  return res.data;
}

export async function updateCustomer(id: string, form: CustomerFormState) {
  const res = await api.patch(`/customers/${id}`, form);
  return res.data;
}

export async function deleteCustomer(id: string) {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
}
