import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCustomer, updateCustomer } from "../api/customersApi";

import type { CustomerFormState } from "../utils/customer.types";

export function useSaveCustomer(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, form }: { id?: string; form: CustomerFormState }) => {
      if (id) {
        return updateCustomer(id, form);
      }

      return createCustomer(form);
    },

    onSuccess: async (data) => {
      toast.success(data?.message || "Saved successfully");

      await queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Operation failed",
      );
    },
  });
}
