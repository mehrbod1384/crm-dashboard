import api from "@/lib/axios";

export async function getCustomersDataApi() {
  const res = await api.get("/dashboard");

  return res.data.data;
}
