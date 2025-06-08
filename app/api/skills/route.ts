import { Skill } from "@/lib/models/Skill";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const skills = await Skill.find();
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, type } = await req.json();

  if (!name || !type) {
    return NextResponse.json(
      { message: "Missing name or type" },
      { status: 400 }
    );
  }

  const exists = await Skill.findOne({ name, type });
  if (exists) {
    return NextResponse.json(
      { message: "Skill already exists" },
      { status: 400 }
    );
  }

  const newSkill = await Skill.create({ name, type });
  return NextResponse.json(newSkill, { status: 201 });
}
