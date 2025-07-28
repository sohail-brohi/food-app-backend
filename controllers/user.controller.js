const { getCollection } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = getCollection("users");

const SignUp = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        msg: "Request body is missing",
      });
    }
    const { email, password, name, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    // Check if user already exists
    const userExit = await User.findOne({ email });
    if (userExit) {
      return res.status(403).json({
        msg: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    // Create a new user object
    const newUser = {
      fullName: name,
      email,
      password: hashedPassword, // In a real application, you should hash the password before saving
      role: role || "user", // Default role is 'user' if not provided
      createdAt: new Date(),
    };

    // Insert the new user into the database
    const result = await User.insertOne(newUser);

    if (result.acknowledged) {
      res.status(201).json({
        msg: "User created successfully",
        userId: result.insertedId,
      });
    } else {
      res.status(500).json({
        msg: "Failed to create user",
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        msg: "Request body is missing",
      });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    // Generate JWT token

    const constructedUser = {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const accessToken = jwt.sign(constructedUser, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      msg: "Login successful",
      accessToken,
      user: constructedUser,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    // Find all users from database
    const users = await User.find({}).toArray();

    // Remove sensitive information like passwords
    const sanitizedUsers = users.map((user) => ({
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));

    res.status(200).json({
      msg: "Users retrieved successfully",
      users: sanitizedUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};
module.exports = {
  SignUp,
  Login,
  getAllUser,
};
