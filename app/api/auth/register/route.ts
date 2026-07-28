import * as authService from "@/features/auth/service/authService";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);
    const { name, email, password } = body;

    const user = await authService.register(name, email, password);

    return NextResponse.json(
      {
        message: "User created successfully",
        data: user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
