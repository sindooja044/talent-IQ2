import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  if (!ENV.DB_URL) {
    throw new Error("DB_URL is not defined");
  }

  const conn = await mongoose.connect(ENV.DB_URL);
  isConnected = true;

  console.log("✅ MongoDB connected:", conn.connection.host);
};
