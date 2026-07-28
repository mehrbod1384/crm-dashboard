"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: loginMutation, isPending: isLoging } = useMutation({
    mutationFn: login,
    onSuccess: () => (window.location.href = "/dashboard"),
    onError: (error) => toast.error(error.message),
  });

  return { loginMutation, isLoging };
}
