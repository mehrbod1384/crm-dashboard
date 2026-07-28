import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCustomer } from "../api/customersApi";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,

    onSuccess: async (data) => {
      toast.success(data?.message || "Customer deleted");

      await queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Delete failed",
      );
    },
  });
}
