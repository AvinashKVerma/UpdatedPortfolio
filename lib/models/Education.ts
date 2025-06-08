import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  achievements: string;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String },
    achievements: { type: String },
  },
  { timestamps: true }
);

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);

export default Education;
