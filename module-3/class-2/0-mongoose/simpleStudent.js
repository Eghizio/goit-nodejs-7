import mongoose, { Schema } from "mongoose";

const simpleStudentsSchema = new Schema({
  name: String,
  age: Number,
  grades: [Number],
  isAdmin: Boolean,
});

export const SimpleStudent = mongoose.model("simplestudent", simpleStudentsSchema);