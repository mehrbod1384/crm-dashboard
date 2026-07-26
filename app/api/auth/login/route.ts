import { connectDB } from "@/lib/db";
import * as authService from "@/features/auth/authService";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    const { user, token } = await authService.login(email, password);

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
