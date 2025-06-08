import Category from "@/lib/models/Category";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

interface Params {
  params: { title: string };
}

export async function DELETE(req: Request, { params }: Params) {
  await connectToDatabase();
  const deleted = await Category.findOneAndDelete({ title: params.title });

  if (!deleted) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}
