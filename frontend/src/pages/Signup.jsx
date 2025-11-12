import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://campusconnect-2r6u.onrender.com/api/auth/signup", // ✅ your backend signup route
        { name, email, password }
      );

      setMsg("✅ Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500); // Redirect after 1.5s
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMsg(`❌ ${err.response.data.message}`);
      } else {
        setMsg("❌ Failed to create account. Try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 shadow-md rounded w-80"
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">Sign Up</h2>

        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          Create Account
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {msg && <p className="mt-3 text-center text-sm">{msg}</p>}
      </form>
    </div>
  );
}
