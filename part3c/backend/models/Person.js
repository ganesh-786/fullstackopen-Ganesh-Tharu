import mongoose from "mongoose";

// Custom validator for phone number
const phoneValidator = (value) => {
  // Must be at least 8 characters long
  if (value.length < 8) return false;
  
  // Must match pattern: 2-3 digits, dash, then more digits
  const phoneRegex = /^\d{2,3}-\d+$/;
  return phoneRegex.test(value);
};

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: phoneValidator,
        message: 'Phone number must be at least 8 characters long and in format XX-XXXXXXX or XXX-XXXXXXX'
      }
    },
  },
  { timestamps: true }
);

export const Person = mongoose.model("Person", personSchema);
