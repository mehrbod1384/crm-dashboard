import { AppError } from "@/lib/errors/AppError";
import { comparePassword, hashPassword } from "@/lib/password";
import { signToken } from "@/lib/token";
import User from "@/models/User";

export async function register(name: string, email: string, password: string) {
  if (!name || !email || !password)
    throw new AppError("All fields are required", 400);

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new AppError("User already exists", 409);

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}

export async function login(email: string, password: string) {
  if (!email || !password)
    throw new AppError("Email and password are required", 400);

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError("Invalid credentials", 401);

  const isValid = await comparePassword(password, user.password);

  if (!isValid) throw new AppError("Invalid credentials", 401);

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  });

  return { user, token };
}
