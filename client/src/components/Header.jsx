import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // Ensures state updates after logout
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="ReactJs" className="h-8 w-8" />
        <span className="text-xl font-bold">ReactJSS</span>
      </Link>
      <nav className="flex space-x-6">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/events" className="hover:underline">Events</NavLink>
        <NavLink to="/about" className="hover:underline">About</NavLink>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-green-400">Logged in as {userRole}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink to="/register" className="hover:underline">Register</NavLink>
            <NavLink to="/login" className="hover:underline">Login</NavLink>
            {userRole === "admin" && <NavLink to="/admin" className="hover:underline">Admin</NavLink>}
            {userRole && <NavLink to="/user" className="hover:underline">User</NavLink>}
          </>
        )}
      </nav>
      
    </header>
  );
};

export default Header;
