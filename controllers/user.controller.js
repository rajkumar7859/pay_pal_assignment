const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        name,
        password: hashedPassword
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User register successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
  };
  
  const getUser = async (req, res) => {
    try {
      const users = await User.find();
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createUser,
    getUser,
    loginUser,
  };