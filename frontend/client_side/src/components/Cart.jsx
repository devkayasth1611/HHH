import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
  const [selectedServices, setSelectedServices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || {};
    setCart(savedCart);

    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/services/service"
        );
        const details = response.data.data.reduce((acc, service) => {
          acc[service.serviceName] = {
            description: service.description,
            image: service.serviceImage,
            _id: service._id,
          };
          return acc;
        }, {});
        setServiceDetails(details);
      } catch (error) {
        console.error("Error fetching service details", error);
      }
    };
    fetchServiceDetails();
  }, []);

  const handleRemoveService = (service) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[service];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCart({});
    sessionStorage.removeItem("cart");
  };

  const handleBookNow = (service) => {
    const serviceData = serviceDetails[service];
    if (serviceData?._id) {
      const serviceDataForBooking = {
        serviceName: service,
        serviceId: serviceData._id,
      };
      navigate("/BookingPage", {
        state: { serviceData: serviceDataForBooking },
      });
    } else {
      alert("Service details are still loading. Please try again.");
    }
  };

  const handleSelectService = (service) => {
    setSelectedServices((prevSelected) => ({
      ...prevSelected,
      [service]: !prevSelected[service],
    }));
  };

  const handleBookSelected = () => {
    const selected = Object.keys(selectedServices)
      .filter((service) => selectedServices[service])
      .map((service) => {
        const serviceData = serviceDetails[service];
        return serviceData
          ? { serviceName: service, serviceId: serviceData._id }
          : null;
      })
      .filter((service) => service); // Filter out any null entries

    if (selected.length > 0) {
      navigate("/BookingPage", { state: { services: selected } });
    } else {
      alert("No services selected. Please select services to book.");
    }
  };
  const handleBookAll = () => {
    const allServices = Object.keys(cart)
      .map((service) => {
        const serviceData = serviceDetails[service];
        return serviceData
          ? { serviceName: service, serviceId: serviceData._id }
          : null;
      })
      .filter((service) => service); // Filter out any null entries
    if (allServices.length > 0) {
      navigate("/BookingPage", { state: { services: allServices } });
    } else {
      alert("Some services are still loading. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card shadow-lg">
        <div className="card-header text-white text-center">
          <h4 className="title1">Your Cart</h4>
        </div>
        <div className="card-body">
          {Object.keys(cart).length === 0 ? (
            <p className="text-center text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {Object.keys(cart).map((service) => (
                <li
                  key={service}
                  className="list-group-item d-flex align-items-center justify-content-between border-0"
                  style={{
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
                    marginBottom: "1rem",
                    padding: "1rem",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={!!selectedServices[service]}
                      onChange={() => handleSelectService(service)}
                      className="me-2"
                    />
                    <img
                      src={`http://localhost:3000/uploads/${serviceDetails[service]?.image}`}
                      alt={service}
                      className="img-fluid rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1 fw-bold">{service}</h5>
                      <p
                        className="text-muted mb-1"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {serviceDetails[service]?.description}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleRemoveService(service)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleBookNow(service)}
                    >
                      Book 
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/Service")}
          >
            Continue buying service
          </button>
          <button className="btn btn-danger me-2" onClick={handleClearCart}>
            Clear Cart
          </button>
          {Object.keys(cart).length > 0 && (
            <>
              <button className="btn btn-warning me-2" onClick={handleBookSelected}>
                Book Selected Services
              </button>
              <button className="btn btn-warning" onClick={handleBookAll}>
                Book All Services
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
