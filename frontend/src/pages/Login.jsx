import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://your-backend-url/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Login successful!");
    } catch {
      setMsg("❌ Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl mb-4">Login</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 mb-2 w-full" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <p className="mt-2">{msg}</p>
      </form>
    </div>
  );
}
