import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/logins/login", { email, password });

      // Checking if response is received and the data is valid
      if (response && response.data && response.data.success) {
        // Log response to verify data
        console.log("Login Response:", response.data);

        // Store userId and email in localStorage after successful login
        localStorage.setItem("userId", response.data.data.user._id); // Store userId for profile page
        localStorage.setItem("userEmail", response.data.data.user.email); // Store email (optional)
        
        // You can also store the entire user object if needed
        localStorage.setItem("userData", JSON.stringify(response.data.data.user));

        alert("Login successful");

        // Redirect to Profile Page after successful login
        navigate("/"); // Ensure this route exists and points to the profile page
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Enter Correct Email & Password");
    }
  };

  return (
    <div className="container">
      <div className="container-fluid login-signup-container">
        <div className="row">
          <div className="col-md-6 signin-container">
            <div className="signin-form">
              <h2 className="text-center">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 signup-container">
            <div className="signup-form">
              <h2>Sign Up</h2>
              <p>New to our platform? Create an account to get started!</p>
              <Link to="/Register">
                <button className="btn btn-outline-light">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
