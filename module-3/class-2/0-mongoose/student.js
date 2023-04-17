import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grades: {
    type: [Number],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

export const Student = mongoose.model("student", studentSchema);