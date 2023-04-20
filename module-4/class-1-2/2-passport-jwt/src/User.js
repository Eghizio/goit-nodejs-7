import { model, Schema } from "mongoose";

export const User = model("user", new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}));