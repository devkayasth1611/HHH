const express = require("express"); // creating the server
const cors = require('cors');
const app = express();
const path = require('path');
require("dotenv").config();

const mongoose = require("mongoose"); // For Connecting to Database

const allowedOrigins = [
  'http://localhost:5173', // Client port (Adjust as per your Vite client port)
  'http://localhost:5174'  // Admin port (Adjust as per your Vite admin port)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));

app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: false })); // middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect("mongodb://127.0.0.1:27017/Home_Helper_Hub")
  .then((sucess) => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, (err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port=>" + 3000);
  }
}); //where my services will called()




const reviewRoutes = require("./routes/reviewRoutes");
app.use("/reviews", reviewRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/services", serviceRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const sendMail = require("./util/mailer");
app.post("/sendMail", sendMail);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admins", adminRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/bookings", bookingRoutes);

const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
app.use("/forgotpasswords", forgotPasswordRoutes);

const adminLoginRoutes = require('./routes/adminLoginRoutes')
app.use("/adminlogins", adminLoginRoutes);

const loginRoutes = require("./routes/loginRoutes");
app.use("/logins", loginRoutes);

const mailerRoutes = require("./routes/mailerRoutes");
app.use("/sendmails", mailerRoutes);

const serviceProviderRoutes = require("./routes/serviceProviderRoutes");
app.use("/serviceproviders", serviceProviderRoutes);