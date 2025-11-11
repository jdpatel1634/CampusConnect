import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("API running..."));

const PORT = 5000;

app.listen(PORT, function () {
  console.log("Server running on port 5000");
});


import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

import courseRoutes from "./routes/course.js";
import studentRoutes from "./routes/student.js";

app.use("/api/courses", courseRoutes);
app.use("/api/student", studentRoutes);

});


