import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/forgotpasswords/forgotpassword", // Adjust this to match your backend route
        { email }
      );

      if (response.status === 200) {
        setMessage("Password has been sent to your email.");
        
        // Redirect to login page after a brief delay to show success message
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000); // Delay in milliseconds
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data.message || "Failed to send email.");
    }
  };

  return (
    <div className="container">
      <div className="forgot-password-container">
        <h2 className="service_taital">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
