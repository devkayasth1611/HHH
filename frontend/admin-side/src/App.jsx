import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import SideBar from "./Component/SideBar";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import Login from "./Component/Login";
import AdminForm from "./Component/AdminForm";
import AdminTable from "./Component/AdminTable";
import UserTable from "./Component/UserTable";
import ServiceForm from "./Component/ServiceForm";
import ServiceTable from "./Component/ServiceTable";
import ReviewTable from "./Component/ReviewTable";
import BookingTable from "./Component/BookingTable";
import ServiceProviderForm from "./Component/ServiceProviderForm";
import ServiceProviderTable from "./Component/ServiceProviderTable";
import ProviderDashboard from "./Component/ProviderDashboard";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// MainLayout handles layout changes and route protection
function MainLayout() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/Login";

  // Function to check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      {/* Show Header and Sidebar only if not on the login page */}
      {!isLoginPage && <Header />}
      {!isLoginPage && <SideBar />}

      <main>
        <Routes>
          {/* Public route */}
          <Route path="/Login" element={<Login />} />

          {/* Protected routes */}
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/AdminForm" element={<AdminForm />} />
              <Route path="/AdminTable" element={<AdminTable />} />
              <Route path="/UserTable" element={<UserTable />} />
              <Route path="/ServiceForm" element={<ServiceForm />} />
              <Route path="/ServiceTable" element={<ServiceTable />} />
              <Route path="/ReviewTable" element={<ReviewTable />} />
              <Route path="/BookingTable" element={<BookingTable />} />
              <Route path="/ServiceProviderForm" element={<ServiceProviderForm />} />
              <Route path="/ServiceProviderTable" element={<ServiceProviderTable />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            </>
          ) : (
            // Redirect to login if not logged in
            <Route path="*" element={<Navigate to="/Login" replace />} />
          )}
        </Routes>
      </main>

      {/* Show Footer only if not on the login page */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
