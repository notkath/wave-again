import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Store token & role in localStorage
      localStorage.setItem("user", JSON.stringify({ 
        token: res.data.token, 
        role: res.data.role 
      }));

      alert("Login successful!");
      window.location.reload(); // Refresh to update the Header
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={loginUser} className="space-y-4">
        <label className="block">Username</label>
        <input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        <label className="block">Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
