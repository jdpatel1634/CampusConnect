import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch data when component loads
  useEffect(() => {
    fetchCourses();
    fetchMyCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://campusconnect-2r6u.onrender.com/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const fetchMyCourses = async () => {
    try {
      const res = await axios.get("https://campusconnect-2r6u.onrender.com/api/student/mycourses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCourses(res.data);
    } catch (err) {
      console.error("Error fetching my courses:", err);
    }
  };

  const enroll = async (courseId) => {
    try {
      await axios.post(
        "https://campusconnect-2r6u.onrender.com/api/student/enroll",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMyCourses(); // refresh enrolled list
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Available Courses</h2>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="bg-white shadow p-4 rounded">
            <h3 className="font-bold text-lg">{c.code}: {c.name}</h3>
            <p className="text-gray-600">{c.credits} Credits • {c.instructor}</p>
            <button
              onClick={() => enroll(c._id)}
              className="bg-blue-500 text-white px-3 py-1 mt-3 rounded hover:bg-blue-600"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* Enrolled Courses */}
      <h2 className="text-3xl font-semibold mt-10 mb-4">My Courses</h2>
      <ul className="bg-white p-4 rounded shadow">
        {myCourses.map((m) => (
          <li key={m._id} className="border-b py-2">
            {m.courseId.code} — {m.courseId.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
