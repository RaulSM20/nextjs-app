import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ data: categories }, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return new NextResponse(JSON.stringify(category), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
