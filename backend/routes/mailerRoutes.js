const express = require("express");
const router = express.Router();
const sendMail = require("../util/mailer"); // Import the mailer.js function

router.post("/sendmail", sendMail); // This is the route called by the frontend to send the email

module.exports = router;
