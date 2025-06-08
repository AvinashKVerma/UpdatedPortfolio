import { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
}

const CategorySchema = new Schema<ICategory>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

export default models.Category || model<ICategory>("Category", CategorySchema);
