import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ServiceProviderForm() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services/service");
        if (response.status === 200) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      phoneNumber: event.target.phoneNumber.value,
      serviceName: event.target.serviceName.value,
      password: event.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/serviceproviders/serviceprovider",
        formData
      );

      if (response.status === 200) {
        alert("Service Provider data added successfully!");
        window.location.reload();
      } else {
        alert("Error adding Service Provider!");
      }
    } catch (error) {
      console.error("There was an error!", error.response ? error.response.data : error);
      alert("Error: " + (error.response ? error.response.data.message : "Unknown error"));
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Service Provider Form</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Forms</li>
              <li className="breadcrumb-item active">Service Provider</li>
            </ol>
          </nav>
        </div>

        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Service Provider</h5>

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="serviceName" className="form-label">
                    Select Service
                  </label>
                  <select className="form-control" id="serviceName" required>
                    <option value="">-- Select a Service --</option>
                    {services.map((service) => (
                      <option key={service._id} value={service.serviceName}>
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ServiceProviderForm;
