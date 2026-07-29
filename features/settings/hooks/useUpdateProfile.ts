import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/profileApi";
import toast from "react-hot-toast";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}
