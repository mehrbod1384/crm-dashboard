import { AppError } from "@/lib/errors/AppError";
import Customer from "@/models/Customer";

export async function getAll(user: any) {
  if (!user) throw new AppError("Unauthorized", 401);

  const customers = await Customer.find({ owner: user.id }).sort({
    createdAt: -1,
  });

  return customers;
}

export async function create(
  userId: string,
  name: string,
  phone: string,
  email = "",
  company = "",
  notes = "",
) {
  if (!name || !phone) throw new AppError("Name and phone are required", 400);

  const customer = await Customer.create({
    name,
    phone,
    email,
    company,
    notes,
    owner: userId,
  });

  return customer;
}
