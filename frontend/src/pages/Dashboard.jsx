import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Define fetch functions first and wrap in useCallback
  const fetchCourses = useCallback(async () => {
    const res = await axios.get(
      "https://student-portal-backend.onrender.com/api/courses"
    );
    setCourses(res.data);
  }, []);

  const fetchMyCourses = useCallback(async () => {
    const res = await axios.get(
      "https://student-portal-backend.onrender.com/api/student/mycourses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMyCourses(res.data);
  }, [token]);

  const enroll = async (id) => {
    await axios.post(
      "https://student-portal-backend.onrender.com/api/student/enroll",
      { courseId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMyCourses();
  };

  // ✅ Add both callbacks as dependencies — no more ESLint warning
  useEffect(() => {
    fetchCourses();
    fetchMyCourses();
  }, [fetchCourses, fetchMyCourses]);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-4">Available Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="bg-white shadow p-4 rounded">
            <h3 className="font-bold">
              {c.code}: {c.name}
            </h3>
            <p>
              {c.credits} credits • {c.instructor}
            </p>
            <button
              onClick={() => enroll(c._id)}
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-3xl mt-10 mb-4">My Courses</h2>
      <ul className="bg-white p-4 rounded shadow">
        {myCourses.map((m) => (
          <li key={m._id}>
            {m.courseId.code} — {m.courseId.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
