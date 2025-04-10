import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
    <header className="header">
      <Link to="/" className="logo">
        <span>BlueHope</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/events" className="nav-link">Events</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        {isLoggedIn ? (
          <div className="user-info">
            <span className="user-role">Logged in as {userRole}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <>
            <NavLink to="/register" className="nav-link">Register</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            {userRole === "admin" && (
              <NavLink to="/admin" className="nav-link">Admin</NavLink>
            )}
            {userRole && (
              <NavLink to="/user" className="nav-link">User</NavLink>
            )}
          </>
        )}
      </nav>
      
    </header>
    
  );
};



export default Header;
