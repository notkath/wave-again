import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const login = () => {

    const [data,setData]=useState({
        email:'',
        password:'',
    })

    const loginUser = (e) => {
        e.preventDefault()
        axios.get('/')
    }
  return (
    <div>
        <form onSubmit={loginUser}>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required />
            <button type="submit">Login</button>
        </form>
      
    </div>
  )
}

export default login
