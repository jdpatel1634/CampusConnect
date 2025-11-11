import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  instructor: { type: String },
});

export default mongoose.model("Course", courseSchema);
