import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/react.svg';

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const isLoggedIn = !!userRole;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header>
        <Link to="/" className='logo'>
          <img src={logo} alt='ReactJs' />ReactJSS
        </Link>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events" end>Events</NavLink>
          <NavLink to="/about" end>About</NavLink>
          
          {isLoggedIn ? (
            <>
              <span>Logged in as {userRole}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/register" end>Register</NavLink>
              <NavLink to="/login" end>Login</NavLink>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;