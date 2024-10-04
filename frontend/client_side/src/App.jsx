import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Appointment from "./components/Appointment";
import ContactUs from "./components/ContactUs";
import Service from "./components/service";
import Home from "./components/Home";
import SubService from "./components/SubService";
import Payment from "./pages/Payment";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./components/ProfilePage";
import "./App.css";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/SubService/:serviceId" element={<SubService />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
