import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  grade: { type: String, default: "N/A" },
});

export default mongoose.model("Enrollment", enrollmentSchema);
