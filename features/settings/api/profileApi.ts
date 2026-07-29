import api from "@/lib/axios";

export const getProfile = async () => {
  const res = await api.get("/auth/profile");

  return res.data.data;
};

export const updateProfile = async (payload: {
  name: string;
  email: string;
}) => {
  const res = await api.patch("/auth/profile", payload);

  return res.data;
};
