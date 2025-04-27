// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const userEmail = sessionStorage.getItem("userEmail"); // Get the email from session storage
  console.log("User Email:", userEmail); // Log for debugging
  return userEmail ? element : <Navigate to="/Login" />; // Redirect if not logged in
};

export default ProtectedRoute;
