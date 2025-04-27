import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneNumberRegex = /^\+91\d{10}$/;

    if (formData.fullName.length < 3 || formData.fullName.length > 50) {
      tempErrors.fullName = "Full name must be between 3 and 50 characters.";
    }

    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      tempErrors.phoneNumber =
        "Phone number must be a valid Indian number (+91xxxxxxxxxx).";
    }

    if (!formData.address) {
      tempErrors.address = "Address is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/user",
          formData
        );
        if (response.status === 201 || response.status === 200) {
          alert("Registered successfully!");
          // Send welcome email after successful registration
          await axios.post("http://localhost:3000/sendMail", {
            to: formData.email,
            subject: "Welcome to Our Platform",
            password: formData.password, // Include password in email for user
            name: formData.fullName,
          });
  
          navigate("/Login"); // Redirect to Login after successful registration
        }
      } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message); // Show message if email is already registered
        } else {
          alert("Error during registration!");
        }
      }
    }
  };
  

  // Function to send confirmation email
  const sendConfirmationEmail = async (email) => {
    try {
      const mailResponse = await axios.post("http://localhost:3000/sendmails/sendmail", {
        to: email,
        subject: "Welcome to Our Service!",
      });
      console.log("Mail Response:", mailResponse);
    } catch (error) {
      console.error("Error sending confirmation email:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    if (id === "phoneNumber") {
      // Remove all non-numeric characters except '+' at the beginning
      let cleanedValue = value.replace(/[^0-9+]/g, "");
  
      if (cleanedValue.startsWith("+91")) {
        if (cleanedValue.length > 13) {
          cleanedValue = cleanedValue.slice(0, 13);
        }
      } else {
        if (cleanedValue.length <= 10) {
          cleanedValue = `+91${cleanedValue}`;
        } else {
          cleanedValue = cleanedValue.slice(0, 13);
        }
      }
  
      if (cleanedValue.length <= 3) {
        cleanedValue = "";
      }
  
      setFormData({
        ...formData,
        [id]: cleanedValue,
      });
    } else if (id === "fullName") {
      // Only allow alphabets and spaces for full name
      const nameValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({
        ...formData,
        [id]: nameValue,
      });
    } else {
      // Handle other fields normally
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };
  
  
  

  return (
    <div className="container">
      <div className="container-fluid login-signup-container">
        <div className="row">
          <div className="col-md-6 signup-container">
            <div className="signup-form">
              <h2 className="text-center">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <span className="error-text">{errors.fullName}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number (+91xxxxxxxxxx)"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <span className="error-text">{errors.phoneNumber}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 signin-container">
            <div className="signin-form">
              <h2>Welcome Back</h2>
              <p>Already have an account? Sign in to stay connected with us!</p>
              <Link to="/Login">
                <button className="btn btn-outline-light">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
