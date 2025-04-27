const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../model/userModel"); // User model

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "devkayasth1611@gmail.com", // Replace with your email
        pass: "fatd kdha mlbu kpja", // Replace with your email password
      },
    });

    // Mail options with plain password
    const mailOptions = {
      from: "devkayasth1611@gmail.com",
      to: email,
      subject: "Password Recovery",
      text: `Hello ${user.fullName},\n\nYour password is: ${user.password}\n\nRegards,\nTeam`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password has been sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
