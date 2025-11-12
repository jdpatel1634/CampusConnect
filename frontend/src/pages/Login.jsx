import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();   // 👈 hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // 👈 prevent page reload

    try {
      const res = await axios.post(
        "https://campusconnect-2r6u.onrender.com/api/auth/login",  // ⬅️ replace with your Render backend URL
        { email, password }
      );

      // Save token for authenticated requests
      localStorage.setItem("token", res.data.token);

      // Optional: you can store name too
      localStorage.setItem("name", res.data.name);

      // Set message (briefly) and redirect
      setMsg("✅ Login successful! Redirecting...");
      navigate("/dashboard");      // 👈 THIS is the redirect
    } catch (err) {
      console.error(err);
      setMsg("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded w-80">
        <h2 className="text-2xl mb-4 text-center">Login</h2>

        <input
          className="border p-2 mb-3 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 mb-3 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

        import { Link } from "react-router-dom";

<p className="mt-3 text-sm text-center">
  Don’t have an account?{" "}
  <Link to="/signup" className="text-blue-600 hover:underline">
    Sign Up
  </Link>
</p>


      </form>
    </div>
  );
  
}
