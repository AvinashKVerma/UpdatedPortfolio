import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB, // optional
    });
    isConnected = true;
    console.log("✅ MongoDB connected using Mongoose ====>" + MONGODB_DB);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
