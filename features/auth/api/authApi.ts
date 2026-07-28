import api from "@/lib/axios";

export async function register(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/auth/register", payload);

  return res.data;
}

export async function login(payload: { email: string; password: string }) {
  const res = await api.post("/auth/login", payload);

  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");

  return res.data;
}
