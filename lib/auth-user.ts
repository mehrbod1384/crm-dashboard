import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/token";
import User from "@/models/User";

type TokenPayload = {
  userId: string;
  email: string;
  name: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken<TokenPayload>(token);

    await connectDB();

    const user = await User.findById(decoded.userId).select("_id name email");

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch {
    return null;
  }
}
