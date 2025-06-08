import Category from "@/lib/models/Category";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json(
      { message: "Missing title or description" },
      { status: 400 }
    );
  }

  const exists = await Category.findOne({ title });
  if (exists) {
    return NextResponse.json(
      { message: "Category already exists" },
      { status: 400 }
    );
  }

  const newCategory = await Category.create({ title, description });
  return NextResponse.json(newCategory, { status: 201 });
}
