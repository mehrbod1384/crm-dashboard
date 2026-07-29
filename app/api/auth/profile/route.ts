import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import * as settingService from "@/features/settings/service/settingService";
import { getCurrentUser } from "@/lib/auth-user";
import { AppError } from "@/lib/errors/AppError";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const body = await req.json();

    const { name, email } = body;

    const updatedUser = await settingService.updateProfile(
      user.id,
      name,
      email,
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return handleApiError(error);
  }
}
