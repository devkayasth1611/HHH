import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

function ServiceCategoryTable() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch the service categories from the backend API
        const response = await axios.get("http://localhost:3000/subservices/subservice");
        setServices(response.data.data); // Adjust the structure based on your response
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Service Category Table</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Service Categories</li>
            </ol>
          </nav>
        </div>

        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service Category Table</h5>

                  {/* Responsive Table */}
                  <div className="table-responsive">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Service Name</th>
                          <th>Description</th>
                          <th>Sub Service Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service._id}>
                            <td>{service.subServiceName}</td>
                            <td>{service.description}</td>
                            <td>
                              {/* If there are multiple sub-sub services */}
                              <ul className="list-unstyled">
                                {service.subSubServices?.map((subSubService, index) => (
                                  <li key={index}>{subSubService}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              {/* Add buttons for editing and deleting services */}
                              <button className="btn btn-warning me-2" onClick={() => handleEdit(service._id)}>
                                Edit
                              </button>
                              <button className="btn btn-danger" onClick={() => handleDelete(service._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* End Table with stripped rows */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Example of edit and delete functionality (these can be modified based on your needs)
const handleEdit = (serviceId) => {
  console.log("Edit service with ID:", serviceId);
  // Implement your logic for editing a service
};

const handleDelete = async (serviceId) => {
  console.log("Delete service with ID:", serviceId);
  // Optionally, implement deletion logic by calling an API to delete the service
  try {
    await axios.delete(`http://localhost:3000/subServices/subService/${serviceId}`);
    alert("Service deleted successfully");
    window.location.reload();
    // Reload the page or update the services list in state after deletion
  } catch (err) {
    console.error("Failed to delete service", err);
  }
};

export default ServiceCategoryTable;
