import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const product = await prisma.product.findFirst({
      where: { id: id },
    });
    if (!product) {
      return new NextResponse("product not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const result = await prisma.product.update({
      where: { id: id },
      data: data,
    });
    if (!result) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.formData();
    const file = data.get("image");

    let imageName = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(process.cwd(), "public", file.name);
      await writeFile(filePath, buffer);

      imageName = file.name;
    }
    const updatedProductData = {
      name: data.get("name") || "",
      description: data.get("description") || "",
      Category: parseInt(data.get("Category")) || 0,
      image: imageName || "",
    };

    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: updatedProductData,
    });

    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.product.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
