import Project from "@/lib/models/Project";
import { connectToDatabase } from "@/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const projects = await Project.find({});
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const {
      projectTitle,
      projectImage,
      projectDescription,
      projectTags,
      projectDemo,
      projectRepo,
    } = await req.json();

    if (!projectTitle) {
      return NextResponse.json(
        { success: false, error: "Project title is required" },
        { status: 400 }
      );
    }

    const tagsArray =
      typeof projectTags === "string"
        ? projectTags.split(",").map((tag) => tag.trim())
        : projectTags;

    const newProject = await Project.create({
      projectTitle,
      projectImage,
      projectDescription,
      projectTags: tagsArray,
      projectDemo,
      projectRepo,
    });

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
