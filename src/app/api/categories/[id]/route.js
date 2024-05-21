import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const category = await prisma.category.findFirst({
      where: { id: id },
    });
    if (!category) {
      return new NextResponse("category not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const result = await prisma.category.update({
      where: { id: id },
      data: data,
    });
    if (!result) {
      return new NextResponse("Category not found", { status: 404 });
    }
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const existingCategory = await prisma.category.findFirst({
      where: { id: id },
    });

    if (!existingCategory) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        name: data.name || existingCategory.name,
      },
    });

    return new NextResponse(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.category.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
