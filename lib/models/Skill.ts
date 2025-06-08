import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  type: "tech" | "ai";
}

const skillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  type: { type: String, enum: ["tech", "ai"], required: true },
});

export const Skill =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);
