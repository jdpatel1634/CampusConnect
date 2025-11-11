import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://student-portal-backend.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });
      setMsg("✅ Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1500); // redirect to login
    } catch (err) {
      console.error(err);
      setMsg("❌ Error: account may already exist");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-md rounded p-8 w-80"
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">Create Account</h2>
        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border p-2 mb-3 w-full rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
        <p className="mt-3 text-center">{msg}</p>
      </form>
    </div>
  );
}
