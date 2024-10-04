import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      // Show one alert and then redirect after it
      alert("You must be logged in to purchase a service.");
      navigate("/Login");
    } else {
      const fetchServices = async () => {
        try {
          const response = await axios.get('http://localhost:3000/services/service');
          setServices(response.data.data); // Assuming response data is an array of services
          setLoading(false);
        } catch (err) {
          setError("Failed to load services");
          setLoading(false);
        }
      };

      fetchServices();
    }
  }, [navigate]);

  if (!localStorage.getItem("userEmail")) return null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='services_container'>
      <div className="service_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="service_taital">Our Services</h2>
            </div>
          </div>
          <div className="service_section_2">
            <div className="row">
              {services.map(service => (
                <div key={service._id} className="col-lg-3 col-sm-6">
                  <div className="service_box">
                    <div className="building_icon">
                      <img className='img_s' src={`http://localhost:3000/uploads/${service.serviceImage}`} alt={service.serviceName} />
                    </div>
                    <h4 className="residential_text">{service.serviceName}</h4>
                    <p className="service_text">
                      {service.description}
                      <br />
                      <div className="readmore_bt">
                        <Link to={`/SubService/${service._id}`}>Read More</Link>
                      </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
