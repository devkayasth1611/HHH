const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controller/adminLogin"); // Adjust path as needed

// POST route for admin login
router.post("/adminlogin", adminLogin);

module.exports = router;
