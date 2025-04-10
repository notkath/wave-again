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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userId", res.data._id); 
 
      // Store the user's role
      console.log("Token stored in localStorage:", localStorage.getItem("token"));
      console.log("User role stored in localStorage:", localStorage.getItem("userRole"));
  
      alert(`Login successful as ${res.data.role}`);
      window.location.reload(); // Refresh to update the Header
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={loginUser} className="login-form">
        <label className="login-label">Username</label>
        <input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
          className="login-input"
        />
  
        <label className="login-label">Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
          className="login-input"
        />
  
        {error && <p className="login-error">{error}</p>}
  
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
  
};

export default Login;
