import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ServiceProviderDetails = () => {
  const location = useLocation();
  const [providerDetails, setProviderDetails] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Get bookingId from sessionStorage
  const bookingId = sessionStorage.getItem("latestBookingId");

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided.");
      return;
    }

    axios
      .get(`http://localhost:3000/bookings/assigned-providers/${bookingId}`)
      .then((res) => {
        if (res.data.status === 200) {
          setProviderDetails(res.data.providers);
          setBookingDate(res.data.bookingDate || sessionStorage.getItem("latestBookingDate"));

          // Check if the booking status is completed
          if (res.data.bookingStatus === "Completed") {
            setIsCompleted(true);
          }
        } else {
          setError("Failed to fetch provider details.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching providers.");
      });
  }, [bookingId]);

  const handleRemoveCompletedService = () => {
    // Remove the completed service from sessionStorage
    const updatedProviderDetails = providerDetails.filter((item) => item.bookingId !== bookingId);
    setProviderDetails(updatedProviderDetails);

    // Optionally, remove the completed service from session storage as well
    sessionStorage.removeItem("latestBookingId");
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2 className="service_taital">Assigned Service Providers</h2>

      {providerDetails.length === 0 ? (
        <p>No providers assigned yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Provider Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {providerDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.serviceName}</td>
                <td>{item.fullName ? item.fullName : "Pending"}</td>
                <td>{item.phoneNumber ? item.phoneNumber : "Pending"}</td>
                <td>{item.email ? item.email : "Pending"}</td>
                <td>{bookingDate ? bookingDate : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show Review button only if status is completed */}
      {isCompleted && (
        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleRemoveCompletedService}>
            Remove Completed Service and Show Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderDetails;
