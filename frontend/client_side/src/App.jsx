import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Service from "./components/service";
import Home from "./components/Home";
import SubService from "./components/SubService";
import Payment from "./pages/Payment";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./components/ProfilePage";
import Cart from "./components/Cart";
import BookingPage from "./components/BookingPage";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";
import ServiceProviderDetails from "./components/ServiceProviderDetails";

function App() {
  const userEmail = sessionStorage.getItem("userEmail");

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/SubService/:serviceId" element={<SubService />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/ServiceProviderDetails" element={<ServiceProviderDetails />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          {/* Conditional rendering for Login and Register routes */}
          <Route 
            path="/Login" 
            element={userEmail ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/Register" 
            element={userEmail ? <Navigate to="/" replace /> : <Register />} 
          />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
