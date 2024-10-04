import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import "../App.css";

const ProfilePage = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (!storedUser) {
      navigate("/login"); // Redirect to login if user data is not found
    } else {
      setUser(storedUser); // Set the user state with data from local storage
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      // Update user data via API
      const response = await axios.put(`http://localhost:3000/users/user/${user.email}`, user);

      // Check response status
      if (response.status === 200) {
        // Update local storage with the updated user data
        localStorage.setItem('userData', JSON.stringify(user));
        alert('Profile updated successfully!');
        
        // Refresh the page to reflect the updated data
        window.location.reload(); // Optionally, you can navigate to a specific page if needed
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="profile-container">
      <span>Profile</span>
      <form>
        <label>Full Name:</label>
        <input 
          type="text" 
          name="fullName" 
          value={user.fullName} 
          onChange={handleChange} 
          required
        />

        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={user.email} 
          readOnly 
        />

        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={user.password} 
          onChange={handleChange} 
          required
        />

        <label>Phone Number:</label>
        <input 
          type="text" 
          name="phoneNumber" 
          value={user.phoneNumber} 
          onChange={handleChange} 
          required
        />

        <label>Address:</label>
        <input 
          type="text" 
          name="address" 
          value={user.address} 
          onChange={handleChange} 
          required
        />

        <button type="button" onClick={handleUpdate}>Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
