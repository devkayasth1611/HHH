import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Ensure you have js-cookie installed
import "../App.css";

function Header() {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("userEmail"); // Use session storage

  const handleLogout = () => {
    // Clear session storage and cookies
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    Cookies.remove("email"); // Remove the cookie

    alert("Logged out successfully");

    // Redirect to the home page ("/") after logging out
    navigate("/login"); // This will navigate to the home page
  };

  return (
    <div className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img className="hw" src="./logo.png" alt="Logo" />
            <span className="title">Home Helper Hub</span>
          </Link>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AboutUS">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Service">
                  Services
                </Link>
              </li>

              {/* Conditionally render the "Service Provider" link if user is logged in */}
              {userEmail && (
                <li className="nav-item">
                  <Link className="nav-link" to="/ServiceProviderDetails">
                    Service Provider
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  <img className="hw1" src="../cart.png" alt="Cart" />
                </Link>
              </li>

              {userEmail ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ProfilePage">
                      <img className="img_title1" src="../profile.png" alt="Profile" />
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
