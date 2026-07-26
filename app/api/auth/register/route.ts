import * as authService from "@/features/auth/authService";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;

    const user = await authService.register(name, email, password);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
