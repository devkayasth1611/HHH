import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Painter() {
  const [cart, setCart] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // Track selected service

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch service details from your API
        const response = await axios.get("http://localhost:3000/subservices/subservice");
        setServices(response.data.data); // Adjust if the structure is different
        setLoading(false);
      } catch (err) {
        setError("Failed to load services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = (service) => {
    setCart((prevCart) => ({
      ...prevCart,
      [service]: (prevCart[service] || 0) + 1,
    }));
  };

  const handleRemoveService = (service) => {
    setCart((prevCart) => {
      if (prevCart[service] > 1) {
        return { ...prevCart, [service]: prevCart[service] - 1 };
      } else {
        const { [service]: _, ...rest } = prevCart;
        return rest;
      }
    });
  };

  const handleSelectService = (service) => {
    setSelectedService(service); // Set the selected service
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="center_text">
        <div className="building_icon">
          <img className="img_title" src="../homepainter.png" alt="Painter" />
        </div>
        <h2 className="title1">Add Painting Services</h2>
        <p className="text-muted mb-5">
          Select and customize your painting services. Choose from various categories and add the ones you need!
        </p>
      </div>

      {services.map((service) => (
        <section key={service._id} className="mb-5">
          <h3 className="text-primary mb-3 title1">{service.subServiceName}</h3>
          <div className="row">
            <div className="col-md-6">
              <p>{service.description}</p>
            </div>
            <div className="col-md-6">
              <ul className="list-group">
                {service.subSubServices.map((subService) => (
                  <li key={subService} className="list-group-item">
                    {subService}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <button
              className="btn btn-success me-3"
              onClick={() => handleAddService(service.subServiceName)}
            >
              Add Service
            </button>
            <button
              className="btn btn-danger me-2"
              onClick={() => handleRemoveService(service.subServiceName)}
              disabled={!cart[service.subServiceName]}
            >
              Remove
            </button>
            <button
              className="btn btn-info ms-3"
              onClick={() => handleSelectService(service)}
            >
              View Details
            </button>
            <span className="ms-3 fw-bold">{cart[service.subServiceName] || 0}</span>
          </div>
        </section>
      ))}

      {/* Display selected service form details */}
      {selectedService && (
        <div className="service-details-form mt-5">
          <h3 className="text-primary">{selectedService.subServiceName} Details</h3>
          <p>{selectedService.description}</p>
          <ul className="list-group mb-3">
            {selectedService.subServices.map((subService) => (
              <li key={subService} className="list-group-item">
                {subService}
              </li>
            ))}
          </ul>
          {/* Here, you can add more form fields to capture user input */}
          <form>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Enter Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="Enter quantity"
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}

      {/* Link to Cart Page */}
      <div className="mt-5">
        <Link to="/cart" state={{ cart }} className="btn btn-primary">
          View Selected Services ({Object.values(cart).reduce((a, b) => a + b, 0)})
        </Link>
      </div>
    </div>
  );
}

export default Painter;
