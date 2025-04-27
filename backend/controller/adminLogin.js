require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../model/adminModel");
const ServiceProvider = require("../model/serviceProviderModel");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // First, try finding the user in the Admin collection
    let user = await Admin.findOne({ email });

    if (user && user.roleId === 1) { // Admin role check
      if (password !== user.password) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, roleId: user.roleId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        token,
        roleId: user.roleId,
        user: {
          _id: user._id,
          name: user.adminName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        message: "Admin login successful",
      });
    }

    // If not found in Admin, try Service Provider collection
    user = await ServiceProvider.findOne({ email });

    if (user && user.roleId === 2) { // Service Provider role check
      if (password !== user.password) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, roleId: user.roleId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        token,
        roleId: user.roleId,
        user: {
          _id: user._id,
          name: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        message: "Service Provider login successful",
      });
    }

    return res.status(404).json({ success: false, message: "User not found" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
