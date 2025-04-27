import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Header() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    console.log("Header component mounted");
    const adminData = sessionStorage.getItem("adminData");
  
    if (adminData) {
      try {
        const parsedAdminData = JSON.parse(adminData);
        console.log(parsedAdminData); // Check the admin data
        if (parsedAdminData && parsedAdminData.name) {
          setAdminName(parsedAdminData.name); // Set admin name if available
        }
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }
  }, []);  

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Home Helper Hub</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Header;
