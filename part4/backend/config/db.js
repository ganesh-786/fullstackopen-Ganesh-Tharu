import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("error connecting database!", error);
    process.exit(1); // close connection with failure
  }
};
