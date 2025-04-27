import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/adminlogins/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("roleId", data.roleId);

        if (data.roleId === 2) {
          // 🛠️ Save provider details in sessionStorage
          sessionStorage.setItem("provider", JSON.stringify(data.user));
        }

        if (data.roleId === 1) {
          navigate("/"); // Admin dashboard
        } else if (data.roleId === 2) {
          navigate("/provider-dashboard"); // Service Provider dashboard
        }
      } else {
        setError(data.message || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your email & password to login
                    </p>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                  </div>

                  <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
