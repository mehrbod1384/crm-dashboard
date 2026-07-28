"use client";

import { useMutation } from "@tanstack/react-query";
import { register } from "../api/authApi";
import toast from "react-hot-toast";

export function useRegister() {
  const { mutate: registerMutation, isPending: isRegistering } = useMutation({
    mutationFn: register,
    onSuccess: () => (window.location.href = "/dashboard"),
    onError: (error) => toast.error(error.message),
  });

  return { registerMutation, isRegistering };
}
