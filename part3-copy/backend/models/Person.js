import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Person = mongoose.model("Person", personSchema);
