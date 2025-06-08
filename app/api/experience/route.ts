import Experience from "@/lib/models/Experience";
import { connectToDatabase } from "@/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const experiences = await Experience.find({});
  return NextResponse.json({ success: true, data: experiences });
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const {
      companyName,
      jobTitle,
      startDate,
      endDate,
      description,
      achievements,
      technologies,
    } = data;

    if (!companyName || !jobTitle || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const newExperience = await Experience.create({
      companyName,
      jobTitle,
      startDate,
      endDate,
      description,
      achievements,
      technologies,
    });

    return NextResponse.json(
      { success: true, data: newExperience },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving experience:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
