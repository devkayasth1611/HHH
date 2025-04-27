import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedEmail = sessionStorage.getItem("userEmail");

      if (!storedEmail) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users/user/email/${storedEmail}`
        );

        if (response.status === 200 && response.data.data) {
          setUser(response.data.data);
          fetchBookingHistory(response.data.data._id); // Fetch booking history
        } else {
          alert("Error fetching user details");
        }
      } catch (error) {
        alert("An error occurred while fetching user details.");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const fetchBookingHistory = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bookings/booking/history/${userId}`
      );
      if (response.status === 200 && response.data.history) {
        setBookingHistory(response.data.history);
      } else {
        alert("Error fetching booking history");
      }
    } catch (error) {
      console.error("Error fetching booking history:", error);
      alert("Error fetching booking history");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/user/${user.email}`,
        user
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      alert("An error occurred while updating the profile.");
    }
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      <p>Profile</p>
      <form>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          readOnly={!isEditing}
          required
        />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} readOnly />

        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={handleChange}
          readOnly={!isEditing}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          readOnly={!isEditing}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          readOnly={!isEditing}
          required
        />

        <div className="d-flex gap-2">
          {isEditing ? (
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-primary"
            >
              Update Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={enableEditing}
              className="btn btn-secondary"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>

      {/* Booking History Table */}
      <div style={{ marginTop: "20px" }}>
        <h3>Booking History</h3>
        {bookingHistory.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Services
                </th>
                <th
                  style={{
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  }}
                >
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {booking.serviceIds
                      .map((service) => service.serviceName)
                      .join(", ")}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {booking.alternativeAddress || "No additional details"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No booking history available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
