import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ data: products }, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("image");

    if (!file) {
      return new NextResponse("No image found", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", file.name);
    await writeFile(filePath, buffer);

    const product = await prisma.product.create({
      data: {
        name: data.get("name"),
        description: data.get("description"),
        Category: parseInt(data.get("Category")),
        image: file.name,
      },
    });
    return new NextResponse(JSON.stringify(product), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
