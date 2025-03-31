
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const test = (req, res) => {
    res.json('Hello World').status(200);
  }
  
  
  const register = async (req, res) =>{
    try{
    const {username,password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      username,
      password: hashedPassword,
      role
    });
    await newUser.save();
    res.status(201).json({message: 'User registered successfully'});
  }catch (error) {
    res.status(500).json({message: 'Error registering userrrr', error: error.message});
  }
  }

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Send both token and role in the response
      res.status(200).json({
        token,
        role: user.role,
        id: user._id // Include the user's role
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
  };
  
module.exports = { test,
    register, login
 };