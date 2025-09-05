import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 10,
    },
    number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Person = mongoose.model("Person", personSchema);
