
import React from 'react'
import {Link, NavLink} from "react-router-dom";
import logo from '../assets/react.svg'


const Header = () => {
  return (
    <div>
      <header>
        <Link to="/" className='logo'><img src={logo} alt='ReactJs' />ReactJSS
        </Link>
        <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/events" end>Events</NavLink>
            <NavLink to="/about" end>About</NavLink>
            <NavLink to="/register" end>Register</NavLink>
        </nav>
      </header>
    </div>
  )
}

export default Header



