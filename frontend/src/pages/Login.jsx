import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ combined import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Campus Connect";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://campusconnect-2r6u.onrender.com/api/auth/login", // ✅ your backend URL
        { email, password }
      );

      // Save token and name
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      setMsg("✅ Login successful! Redirecting...");
      navigate("/dashboard"); // ✅ Redirect after login
    } catch (err) {
      console.error(err);
      setMsg("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded w-80"
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>

        <input
          className="border p-2 mb-3 w-full rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 mb-3 w-full rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="mt-3 text-center">{msg}</p>
      </form>
    </div>
  );
}
