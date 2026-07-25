import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-user";
import Customer from "@/models/Customer";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const customers = await Customer.find({ owner: user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { name, phone, email = "", company = "", notes = "" } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Name and phone are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const customer = await Customer.create({
      name,
      phone,
      email,
      company,
      notes,
      owner: user.id,
    });

    return NextResponse.json(
      { message: "Customer created successfully", customer },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
