import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
  technologies: string;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String },
    achievements: { type: String },
    technologies: { type: String },
  },
  { timestamps: true }
);

const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
