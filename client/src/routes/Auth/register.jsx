import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "", // Changed from name to username to match backend
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setMessage("Registration successful! Redirecting to login...");
        setIsRegistered(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message?.includes("already exists")) {
        setMessage("User already registered.");
        setIsRegistered(true);
      } else {
        setMessage(`Failed to register: ${error.response?.data?.message || 'Unknown error'}`);
      }
    }
  };

  // return (
  //   <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow">
  //     <h2 className="text-2xl font-bold mb-4">Register</h2>
  //     {message && <p className={message.includes("successful") ? "text-green-500" : "text-red-500"}>{message}</p>}
      
  //     {isRegistered ? (
  //       <button
  //         onClick={() => navigate("/login")}
  //         className="w-full bg-green-500 text-white p-2 rounded mt-2"
  //       >
  //         Go to Login
  //       </button>
  //     ) : (
  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <input
  //           type="text"
  //           name="username" // Changed from name to username
  //           placeholder="Username"
  //           value={formData.username} // Changed from name to username
  //           onChange={handleChange}
  //           className="w-full p-2 border rounded"
  //           required
  //         />
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="Password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           className="w-full p-2 border rounded"
  //           required
  //         />
  //         <select
  //           name="role"
  //           value={formData.role}
  //           onChange={handleChange}
  //           className="w-full p-2 border rounded"
  //         >
  //           <option value="user">User</option>
  //           <option value="admin">Admin</option>
  //         </select>
  //         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
  //           Register
  //         </button>
  //       </form>
  //     )}
      
  //     <p className="mt-4 text-center">
  //       Already have an account?{' '}
  //       <Link to="/login" className="text-blue-500 underline">
  //         Login here
  //       </Link>
  //     </p>
  //   </div>
  // );
  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
  
      {message && (
        <p className={message.includes("successful") ? "register-success" : "register-error"}>
          {message}
        </p>
      )}
  
      {isRegistered ? (
        <button
          onClick={() => navigate("/login")}
          className="register-goto-btn"
        >
          Go to Login
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text"  name="username" placeholder="Username" value={formData.username} onChange={handleChange}
            className="register-input" required/>
          <input type="password"  name="password"  placeholder="Password" value={formData.password} onChange={handleChange}
            className="register-input" required/>
          <select  name="role" value={formData.role}
            onChange={handleChange}
            className="register-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      )}
  
      <p className="register-login-link">
        Already have an account?{" "}
        <Link to="/login" className="login-redirect">
          Login here
        </Link>
      </p>
    </div>
  );
  
};

export default Register;