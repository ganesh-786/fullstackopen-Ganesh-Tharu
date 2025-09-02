import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database is connected");
  } catch (error) {
    console.log("Error during database connection", error);
    process.exit(1);
  }
};
