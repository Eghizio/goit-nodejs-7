import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});

export const Task = model("task", taskSchema);