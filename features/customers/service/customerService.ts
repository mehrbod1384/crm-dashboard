import { AppError } from "@/lib/errors/AppError";
import Customer from "@/models/Customer";

export async function getAll(user: {
  id: string;
  name: string;
  email: string;
}) {
  if (!user) throw new AppError("Unauthorized", 401);

  const customers = await Customer.find({ owner: user.id }).sort({
    createdAt: -1,
  });

  return customers;
}

export async function get(customerId: string, ownerId: string) {
  const customer = await Customer.findOne({ _id: customerId, owner: ownerId });

  if (!customer) throw new AppError("Customer not found", 404);

  return customer;
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

export async function update(
  customerId: string,
  ownerId: string,
  payload: {
    name: string;
    phone: string;
    email: string;
    company: string;
    notes: string;
    status: string;
  },
) {
  const customer = await Customer.findOneAndUpdate(
    { _id: customerId, owner: ownerId },
    payload,
    { new: true, runValidators: true },
  );

  if (!customer) throw new AppError("Customer not found", 404);

  return customer;
}

export async function deleted(customerId: string, ownerId: string) {
  const customer = await Customer.findOneAndDelete({
    _id: customerId,
    owner: ownerId,
  });

  if (!customer) throw new AppError("Customer not found", 404);
}
