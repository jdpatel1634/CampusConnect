import express from "express";
import jwt from "jsonwebtoken";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Enroll in course
router.post("/enroll", authMiddleware, async (req, res) => {
  const { courseId } = req.body;
  const existing = await Enrollment.findOne({ studentId: req.userId, courseId });
  if (existing) return res.status(400).json({ message: "Already enrolled" });
  const enroll = new Enrollment({ studentId: req.userId, courseId });
  await enroll.save();
  res.json({ message: "Enrolled successfully" });
});

// Get enrolled courses
router.get("/mycourses", authMiddleware, async (req, res) => {
  const courses = await Enrollment.find({ studentId: req.userId }).populate("courseId");
  res.json(courses);
});

export default router;
