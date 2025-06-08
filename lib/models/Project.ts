// models/Project.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProject extends Document {
  projectTitle: string;
  projectImage?: string;
  projectDescription?: string;
  projectTags?: string[];
  projectDemo?: string;
  projectRepo?: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectTitle: { type: String, required: true },
    projectImage: { type: String },
    projectDescription: { type: String },
    projectTags: [{ type: String }],
    projectDemo: { type: String },
    projectRepo: { type: String },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
