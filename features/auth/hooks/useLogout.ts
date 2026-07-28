"use client";

import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/authApi";
import toast from "react-hot-toast";

export function useLogout() {
  const { mutate: logoutMutation, isPending: isLogingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => (window.location.href = "/auth/login"),
    onError: (error) => toast.error(error.message),
  });

  return { logoutMutation, isLogingOut };
}
