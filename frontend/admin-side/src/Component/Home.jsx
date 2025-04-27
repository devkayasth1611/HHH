import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required elements for Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState(""); // New state for User ID search

  useEffect(() => {
    // Fetch booking data from API
    axios
      .get("http://localhost:3000/bookings/booking")
      .then((response) => {
        setBookings(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching booking data!", error);
      });
  }, []);

  // Helper function to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter bookings based on start date, end date, and User ID
  // Filter bookings based on start date, end date, and User ID
const filteredBookings = bookings.filter((booking) => {
  const bookingDate = new Date(booking.createdAt).setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
  const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
  const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;
  const matchesUserId = userId ? booking.userId?._id.includes(userId) : true;
  
  // Ensure bookingDate falls within the start and end date range (if provided)
  return (!start || bookingDate >= start) && (!end || bookingDate <= end) && matchesUserId;
});


  // Prepare data for Bar Chart (Count of Services by Service Name)
  const serviceCounts = bookings.reduce((acc, booking) => {
    booking.serviceIds.forEach((service) => {
      acc[service.serviceName] = (acc[service.serviceName] || 0) + 1;
    });
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(serviceCounts),
    datasets: [
      {
        label: "Service Purchase Count",
        data: Object.values(serviceCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
        </div>

        <section className="section dashboard-section">
          <div className="row">
            {/* Bar Chart for Service Counts (Top) */}
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service Purchase Count</h5>
                  <Bar data={barChartData} />
                </div>
              </div>
            </div>

            {/* Booking Table with Date Filter and User ID Search (Bottom) */}
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Filter Bookings by Date and User ID</h5>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <label>User ID:</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter User ID"
                    />
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Booking Date</th>
                        <th>Service Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                          <tr key={booking._id}>
                            <td>{booking.userId ? booking.userId._id : "Unknown"}</td>
                            <td>{formatDate(booking.createdAt)}</td>
                            <td>{booking.serviceIds.length}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No bookings found for the selected criteria.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
