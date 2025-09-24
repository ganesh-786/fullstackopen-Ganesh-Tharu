import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("error connecting database!", error);
    process.exit(1); // close connection with failure
  }
};
