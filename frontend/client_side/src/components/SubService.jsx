// Painter Component: Painter.js
import React, { useState, useEffect } from "react"; 
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function SubService() {
  const { serviceId } = useParams(); // Get service ID from URL
  const [cart, setCart] = useState({});
  const [service, setService] = useState(null); // Store the selected service
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/subservices/subservice/${serviceId}`);
        setService(response.data.data); // Adjust based on your API structure
        setLoading(false);
      } catch (err) {
        setError("Failed to load service details");
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleAddService = (serviceName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [serviceName]: (prevCart[serviceName] || 0) + 1,
    }));
  };

  const handleRemoveService = (serviceName) => {
    setCart((prevCart) => {
      if (prevCart[serviceName] > 1) {
        return { ...prevCart, [serviceName]: prevCart[serviceName] - 1 };
      } else {
        const { [serviceName]: _, ...rest } = prevCart;
        return rest;
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // If service is not found, handle that scenario
  if (!service) return <p>Service not found</p>;

  return (
    <div className="container">
      <div className="center_text">
        <h2 className="title1">Add Painting Services</h2>
        <p className="text-muted mb-5">
          Select and customize your painting services. Choose from various categories and add the ones you need!
        </p>
      </div>

      <section className="mb-5">
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
        </div>
      </section>

      {/* Link to Cart Page */}
      <div className="mt-5">
        <Link to="/cart" state={{ cart }} className="btn btn-primary">
          View Selected Services ({Object.values(cart).reduce((a, b) => a + b, 0)})
        </Link>
      </div>
    </div>
  );
}

export default SubService;
