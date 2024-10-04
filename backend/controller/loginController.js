const User = require("../model/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Directly compare plain text password
    if (password !== user.password) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // Success response
    return res.status(200).json({
      success: true,
      data: {
        user: { email: user.email }
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
