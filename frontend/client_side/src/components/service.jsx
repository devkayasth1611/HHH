import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Service() {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services/service");
        console.log("API Response:", response.data);

        if (response.data && response.data.data) {
          setServices(response.data.data);
        } else {
          setError("No services available");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || {};
    setCart(savedCart);
  }, []);

  const handleAddService = (service) => {
    setCart((prevCart) => {
      if (!prevCart[service.serviceName]) {
        const updatedCart = {
          ...prevCart,
          [service.serviceName]: 1,
        };
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));

        alert(`Added ${service.serviceName} to cart!`);
        return updatedCart;
      } else {
        alert(`${service.serviceName} is already in the cart.`);
        return prevCart;
      }
    });
  };

  const handleRemoveService = (service) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[service.serviceName] > 1) {
        updatedCart[service.serviceName] -= 1;
      } else {
        delete updatedCart[service.serviceName];
      }
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    alert(`Removed ${service.serviceName} from cart.`);
  };

  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="services_container">
      <div className="service_section layout_padding">
        <div className="container">
          <h2 className="service_taital">Our Services</h2>
          <div className="service_section_2">
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search by service name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="row">
              {filteredServices.length === 0 ? (
                <p>No services found matching your search.</p>
              ) : (
                filteredServices.map((service) => (
                  <div key={service._id} className="col-lg-3 col-sm-6">
                    <div className="service_box">
                      <div className="building_icon">
                        <img
                          className="img_s"
                          src={`http://localhost:3000/uploads/${service.serviceImage}`}
                          alt={service.serviceName}
                        />
                      </div>
                      <h4 className="residential_text">{service.serviceName}</h4>
                      <p className="service_text">{service.description}</p>
                      <div className="d-flex">
                        <button
                          onClick={() => handleAddService(service)}
                          className="btn btn-success me-2"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => handleRemoveService(service)}
                          className="btn btn-danger"
                          disabled={!cart[service.serviceName]}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/Cart")}
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
