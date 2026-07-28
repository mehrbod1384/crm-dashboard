import { connectDB } from "@/lib/db";
import * as customerService from "@/features/customers/service/customerService";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-user";
import { handleApiError } from "@/lib/errors/handleApiError";
import { AppError } from "@/lib/errors/AppError";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    const customers = await customerService.getAll(user!);

    return NextResponse.json({ data: customers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const body = await req.json();

    const { name, phone, email = "", company = "", notes = "" } = body;

    const customer = await customerService.create(
      user.id,
      name,
      phone,
      email,
      company,
      notes,
    );

    return NextResponse.json(
      { message: "Customer created successfully", data: customer },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
