import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState({});

  useEffect(() => {
    // Fetch booking data
    axios
      .get("http://localhost:3000/bookings/booking")
      .then((response) => {
        if (response.data && response.data.status === 200) {
          setBookings(response.data.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the booking data!", error);
        setError("Failed to load bookings");
      });

    // Fetch service providers
    axios
      .get("http://localhost:3000/serviceproviders/serviceprovider")
      .then((res) => {
        if (res.data.status === 200) {
          setServiceProviders(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching service providers", err);
      });
  }, []);

  const handleDeleteClick = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios
        .delete(`http://localhost:3000/bookings/booking/${bookingId}`)
        .then((response) => {
          if (response.data && response.data.status === 200) {
            setBookings((prevBookings) =>
              prevBookings.filter((booking) => booking._id !== bookingId)
            );
          } else {
            console.error("Failed to delete booking:", response);
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the booking!", error);
        });
    }
  };

  const handleProviderChange = (bookingId, serviceId, providerId) => {
    setSelectedProviders((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [serviceId]: providerId,
      },
    }));
  };

  const handleProvideClick = (bookingId) => {
    const providersForBooking = selectedProviders[bookingId];

    if (
      !providersForBooking ||
      Object.values(providersForBooking).includes("")
    ) {
      alert("Please select a provider for all services.");
      return;
    }

    axios
      .post(`http://localhost:3000/bookings/assign-provider/${bookingId}`, {
        providers: providersForBooking,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Providers assigned successfully");
        } else {
          alert("Failed to assign providers");
        }
      })
      .catch((err) => {
        console.error("Error assigning providers:", err);
        alert("Error assigning providers");
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Booking Data</h1>
        </div>
        <section className="section">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Alternative Phone Number</th>
                <th>Date</th>
                <th>Address</th>
                <th>Services</th>
                <th>Assign Providers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const filteredProviders = serviceProviders.filter((provider) =>
                  booking.serviceIds.some(
                    (service) =>
                      provider.serviceId === service._id ||
                      provider.serviceName === service.serviceName
                  )
                );

                return (
                  <tr key={booking._id}>
                    <td>{booking.userId?.fullName || "N/A"}</td>
                    <td>{booking.userId?.phoneNumber || "N/A"}</td>
                    <td>{booking.userId?.email || "N/A"}</td>
                    <td>{booking.alternativePhone || "N/A"}</td>
                    <td>
                      {/* Showing the date */}
                      {booking.date || "N/A"}
                    </td>
                    <td>
                      {booking.alternativeAddress?.trim() ||
                        booking.address ||
                        "N/A"}
                    </td>
                    <td>
                      {booking.serviceIds
                        ?.map((service) => service.serviceName)
                        .join(", ")}
                    </td>
                    <td>
                      {booking.serviceIds.map((service) => (
                        <div key={service._id} className="mb-2">
                          <label className="me-2">{service.serviceName}</label>
                          <select
                            className="form-select"
                            value={
                              selectedProviders[booking._id]?.[service._id] ||
                              ""
                            }
                            onChange={(e) =>
                              handleProviderChange(
                                booking._id,
                                service._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Provider</option>
                            {filteredProviders
                              .filter(
                                (provider) =>
                                  provider.serviceId === service._id ||
                                  provider.serviceName === service.serviceName
                              )
                              .map((provider) => (
                                <option key={provider._id} value={provider._id}>
                                  {provider.fullName || provider.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      ))}
                      <button
                        className="btn btn-sm btn-success mt-1"
                        onClick={() => handleProvideClick(booking._id)}
                      >
                        Provide
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClick(booking._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default BookingTable;
