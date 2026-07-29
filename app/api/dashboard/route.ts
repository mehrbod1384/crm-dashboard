import { connectDB } from "@/lib/db";
import * as dashboardService from "@/features/dashboard/service/dashboardService";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-user";
import { handleApiError } from "@/lib/errors/handleApiError";
import { AppError } from "@/lib/errors/AppError";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const customersData = await dashboardService.getCustomersData(user.id);

    return NextResponse.json({ data: customersData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
