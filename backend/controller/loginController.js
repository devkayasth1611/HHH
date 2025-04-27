require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Directly compare plain text password (for demonstration purposes; recommend hashing passwords)
    if (password !== user.password) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Use JWT secret from .env
      { expiresIn: "1h" }     // Token valid for 1 hour
    );

    // Success response with token
    return res.status(200).json({
      success: true,
      data: {
        user: { email: user.email },
        token, // Send the token to the client
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
