import { Contact } from "@/lib/models/Conact";
import { connectToDatabase } from "@/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    //   const { name, email, message } = await request.json();

    const requiredFields = ["name", "email", "message"];
    for (const element of requiredFields) {
      if (!data[element]) {
        return NextResponse.json(
          { error: `Missing required field: ${element}` },
          { status: 400 }
        );
      }
    }
    await connectToDatabase();

    const result = await Contact.create({ ...data });

    return NextResponse.json({
      message: "Contact form submitted successfully",
      contactId: result._id,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
