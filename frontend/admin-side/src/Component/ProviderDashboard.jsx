import React, { useEffect, useState } from "react";
import axios from "axios";

function ProviderBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const provider = JSON.parse(sessionStorage.getItem("provider"));
    const providerId = provider?._id;

    if (!providerId) {
      console.error("Provider ID is missing");
      return;
    }

    axios
      .get(`http://localhost:3000/bookings/provider/${providerId}`)
      .then((response) => {
        setBookings(response.data.data); // Assuming 'data' contains the array you need
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleComplete = (bookingId) => {
    // Update the booking status to completed
    axios
      .put(`http://localhost:3000/bookings/complete/${bookingId}`)
      .then((response) => {
        if (response.status === 200) {
          // Update local storage/session to remove the completed booking
          const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
          setBookings(updatedBookings);

          // Set session for completed booking
          sessionStorage.setItem("completedBooking", bookingId); // This can be used to display the review page button
        }
      })
      .catch((error) => {
        console.error("Error completing the booking:", error);
      });
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Bookings for Provider</h1>
        </div>
        <section className="section">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>User Phone</th>
                  <th>Services</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.userId?.fullName || "N/A"}</td>
                      <td>{booking.userId?.email || "N/A"}</td>
                      <td>{booking.userId?.phoneNumber || "N/A"}</td>
                      <td>{booking.serviceIds?.map((service) => service.serviceName).join(", ")}</td>
                      <td>{booking.date || "N/A"}</td>
                      <td>
                        <button
                          onClick={() => handleComplete(booking._id)}
                          className="btn btn-success"
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No bookings found for this provider.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProviderBookings;
