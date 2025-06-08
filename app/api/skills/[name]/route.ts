import { Skill } from "@/lib/models/Skill";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

interface Params {
  params: { name: string };
}

export async function DELETE(req: Request, { params }: Params) {
  await connectToDatabase();
  const deleted = await Skill.findOneAndDelete({ name: params.name });

  if (!deleted) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Skill deleted" }, { status: 200 });
}
