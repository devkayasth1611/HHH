import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming axios is used to call the API

function Cart() {
  const { state } = useLocation();
  const [cart, setCart] = useState(state?.cart || {});
  const [serviceDescriptions, setServiceDescriptions] = useState({});
  const navigate = useNavigate();

  // Fetch descriptions dynamically from the API
  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services/service"); // Replace with your actual API endpoint
        const descriptions = response.data.reduce((acc, service) => {
          acc[service.serviceName] = service.description;
          return acc;
        }, {});
        setServiceDescriptions(descriptions);
      } catch (error) {
        console.error("Error fetching service descriptions", error);
      }
    };
    fetchDescriptions();
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

  const handleClearCart = () => {
    setCart({});
  };

  const handleCheckout = () => {
    navigate("/Service", { state: { cart } });
  };

  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">Your Cart</h4>
        </div>
        <div className="card-body">
          {Object.keys(cart).length === 0 ? (
            <p className="text-center text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {Object.entries(cart).map(([service, count]) => (
                <li
                  key={service}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{service}</div>
                    <small>{serviceDescriptions[service]}</small>
                  </div>
                  <div>
                    <button
                      className="btn btn-success btn-sm me-3"
                      onClick={() => handleAddService(service)}
                    >
                      +
                    </button>
                    <span className="badge bg-primary rounded-pill me-3">
                      {count}
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveService(service)}
                      disabled={count === 0}
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-success mt-2" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="btn btn-danger mt-2" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
