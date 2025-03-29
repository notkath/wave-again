import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const register = () => {

const [data,setData]=useState({
name:'',
email:'',
password:'',
role:'user',
})
const registerUser = (e) => {
e.preventDefault()
}

  return (
    <div>
      <form onSubmit={registerUser}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} required />
        <label htmlFor="email">Email</label>    
        <input type="email" name="email" id="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required />
        <label htmlFor="role">Role</label>
        <select name="role" id="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
     <Link to="/login"> Already have an Account?Login</Link>
    </div>
  )
}

export default register
