import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "", // added address
    alternativePhone: "",
    alternativeAddress: "", // still included, but now optional
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // yyyy-mm-dd format

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedEmail = sessionStorage.getItem("userEmail");

      if (!storedEmail) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users/user/email/${storedEmail}`
        );

        if (response.status === 200 && response.data.data) {
          setUserDetails(response.data.data);
        } else {
          console.error("Error:", response.data.message);
          alert("Error fetching user details");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("An error occurred while fetching user details.");
      }
    };

    fetchUserDetails();

    if (location.state?.services) {
      setServices(location.state.services);
    } else if (location.state?.serviceData) {
      setServices([location.state.serviceData]);
    }
  }, [navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "phoneNumber" || name === "alternativePhone") &&
      value.length > 10
    ) {
      return;
    }

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleBooking = async () => {
    if (
      userDetails.alternativePhone &&
      userDetails.alternativePhone.length !== 10
    ) {
      alert("Alternative phone number must be exactly 10 digits.");
      return;
    }

    try {
      const finalAddress = userDetails.alternativeAddress?.trim()
        ? userDetails.alternativeAddress
        : userDetails.address;

      const bookingData = {
        userId: userDetails._id,
        serviceIds: services.map((service) => service.serviceId),
        serviceNames: services.map((service) => service.serviceName),
        phoneNumber: userDetails.phoneNumber,
        email: userDetails.email,
        address: finalAddress,
        alternativePhone: userDetails.alternativePhone,
        date: bookingDate, // 🛑 ADD this
      };

      const postResponse = await axios.post(
        "http://localhost:3000/bookings/booking",
        bookingData
      );

      if (postResponse.status === 200) {
        const createdBooking = postResponse.data.data;
        const bookingId = createdBooking._id;

        // Save bookingId to sessionStorage
        sessionStorage.setItem("latestBookingId", bookingId);
        sessionStorage.setItem("latestBookingDate", bookingDate); // also bookingDate if you want

        navigate("/ServiceProviderDetails");
      } else {
        alert("An error occurred while creating the booking.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="service_taital">Booking Details</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={userDetails.fullName || ""}
            readOnly
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email || ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userDetails.phoneNumber || ""}
            onChange={handleChange}
            className="form-control"
            maxLength="10"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Booking Date:</label>
          <input
            type="date"
            name="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address || ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Alternative Phone Number:</label>
          <input
            type="text"
            name="alternativePhone"
            value={userDetails.alternativePhone || ""}
            onChange={handleChange}
            className="form-control"
            maxLength="10"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Alternative Address: <span className="text-muted">(optional)</span>
          </label>
          <input
            type="text"
            name="alternativeAddress"
            value={userDetails.alternativeAddress || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div>
          <h5>Your Selected Services:</h5>
          {services?.map((service, index) => (
            <div key={index}>
              <p>
                <strong>{service.serviceName}</strong>
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleBooking}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
