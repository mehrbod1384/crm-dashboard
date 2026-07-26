import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-user";
import * as customerService from "@/features/customers/customerService";
import { NextResponse } from "next/server";
import { AppError } from "@/lib/errors/AppError";
import { handleApiError } from "@/lib/errors/handleApiError";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) throw new AppError("Unauthorized", 401);

    const { id } = await params;

    const customer = await customerService.get(id, user.id);

    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) throw new AppError("Unauthorized", 401);

    const { id } = await params;
    const body = await req.json();

    const customer = await customerService.update(id, user.id, body);

    return NextResponse.json(
      { message: "Customer updated successfully", customer },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) throw new AppError("Unauthorized", 401);

    const { id } = await params;

    await customerService.deleted(id, user.id);

    return NextResponse.json(
      { message: "Customer deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
