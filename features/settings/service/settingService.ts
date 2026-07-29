import { AppError } from "@/lib/errors/AppError";
import User from "@/models/User";

export async function updateProfile(
  userId: string,
  name: string,
  email: string,
) {
  if (!name?.trim()) {
    throw new AppError("Name is required", 400);
  }

  if (!email?.trim()) {
    throw new AppError("Email is required", 400);
  }

  const emailExists = await User.findOne({
    email,
    _id: {
      $ne: userId,
    },
  });

  if (emailExists) {
    throw new AppError("Email already exists", 409);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("name email avatar createdAt");

  return updatedUser;
}
