import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRoleId(localStorage.getItem("roleId"));
    };

    // Watch for changes on login/logout
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setRoleId(null);
    navigate("/Login");
  };

  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {roleId === "1" && (
            <>
              {/* Admin Sidebar */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-grid"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  data-bs-target="#tables-nav"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-layout-text-window-reverse"></i>
                  <span>Tables</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="tables-nav"
                  className="nav-content collapse"
                  data-bs-parent="#sidebar-nav"
                >
                  <li>
                    <Link to="/AdminTable">
                      <i className="bi bi-circle"></i>
                      <span>Admin Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/UserTable">
                      <i className="bi bi-circle"></i>
                      <span>User Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceTable">
                      <i className="bi bi-circle"></i>
                      <span>Service Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ReviewTable">
                      <i className="bi bi-circle"></i>
                      <span>Review Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/BookingTable">
                      <i className="bi bi-circle"></i>
                      <span>Booking Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceProviderTable">
                      <i className="bi bi-circle"></i>
                      <span>Service Provider Table</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  data-bs-target="#forms-nav"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-journal-text"></i>
                  <span>Forms</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                  id="forms-nav"
                  className="nav-content collapse"
                  data-bs-parent="#sidebar-nav"
                >
                  <li>
                    <Link to="/AdminForm">
                      <i className="bi bi-circle"></i>
                      <span>Admin Form</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceForm">
                      <i className="bi bi-circle"></i>
                      <span>Service Form</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceProviderForm">
                      <i className="bi bi-circle"></i>
                      <span>Service Provider Form</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}

          {roleId === "2" && (
            <>
              {/* Service Provider Sidebar */}
              <li className="nav-item">
                <Link className="nav-link" to="/provider-dashboard">
                  <i className="bi bi-speedometer2"></i>
                  <span>Provider Dashboard</span>
                </Link>
              </li>
            </>
          )}

          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            {!isLoggedIn ? (
              <Link className="nav-link collapsed" to="/Login">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </Link>
            ) : (
              <button
                className="nav-link collapsed"
                onClick={handleLogout}
                style={{
                  border: "none",
                  background: "none",
                  color: "inherit",
                  textAlign: "left",
                  padding: "0",
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;
