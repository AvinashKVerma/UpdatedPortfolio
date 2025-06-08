import Education from "@/lib/models/Education";
import { connectToDatabase } from "@/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { institution, degree, field, period, description, achievements } =
      body;

    if (!institution || !degree || !field || !period) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newEducation = await Education.create({
      institution,
      degree,
      field,
      period,
      description,
      achievements,
    });

    return NextResponse.json(
      { success: true, data: newEducation },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /education error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
