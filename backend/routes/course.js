import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add a course (admin only - basic version)
router.post("/", async (req, res) => {
  const { code, name, credits, instructor } = req.body;
  const newCourse = new Course({ code, name, credits, instructor });
  await newCourse.save();
  res.json({ message: "Course added" });
});

export default router;
