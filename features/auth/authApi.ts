export async function register(payload: {
  name: string;
  email: string;
  password: string;
}) {}

export async function login(payload: { email: string; password: string }) {}

export async function logout() {}
