import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [updatedService, setUpdatedService] = useState({
    serviceName: '',
    description: '',
    serviceImage: null  // Image file should be null initially
  });

  // Fetch services from backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/services/service")
      .then((response) => {
        setServices(response.data.data); // Assuming the data structure has a 'data' field
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      axios
        .delete(`http://localhost:3000/services/service/${id}`)
        .then((response) => {
          alert("Service deleted successfully!");
          setServices(services.filter((service) => service._id !== id)); // Remove deleted service from state
        })
        .catch((error) => {
          console.error("There was an error deleting the service!", error);
        });
    }
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setUpdatedService({
      serviceName: service.serviceName,
      description: service.description,
      serviceImage: null, // To allow user to keep or change the image
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setUpdatedService((prev) => ({
      ...prev,
      serviceImage: e.target.files[0], // Capture the uploaded file
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('serviceName', updatedService.serviceName);
    formData.append('description', updatedService.description);
    
    // Append image only if it exists
    if (updatedService.serviceImage) {
        formData.append('serviceImage', updatedService.serviceImage);
    }

    console.log("Updating service ID:", editingService._id);

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    // Change the method to PUT for updating the service
    axios
        .put(`http://localhost:3000/services/service/${editingService._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log("Response:", response.data); // Log the response
            alert("Service updated successfully!");
            const updatedServices = services.map((service) =>
                service._id === editingService._id ? { ...service, ...updatedService, serviceImage: updatedService.serviceImage ? updatedService.serviceImage.name : service.serviceImage } : service
            );
            setServices(updatedServices);
            setEditingService(null); // Close the edit form
        })
        .catch((error) => {
            console.error("There was an error updating the service!", error.response || error.message);
            alert("Failed to update the service!"); // Provide user feedback
        });
};

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Data Tables</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Data</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service Tables</h5>

                  {/* Table with stripped rows */}
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>Service Name</th>
                        <th>Description</th>
                        <th>Service Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service._id}>
                          <td>{service.serviceName}</td>
                          <td>{service.description}</td>
                          <td>
                            <img
                              src={`http://localhost:3000/uploads/${service.serviceImage}`}
                              alt={service.serviceName}
                              style={{ width: '100px', height: '100px' }}
                            />
                          </td>
                          <td>
                            <button
                              className="edit-btn"
                              onClick={() => handleEditClick(service)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(service._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* End Table with stripped rows */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {editingService && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Edit Service</h5>

                {/* Edit Form */}
                <form className="row g-3" onSubmit={handleUpdate}>
                  <div className="col-12">
                    <label className="form-label">Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="serviceName"
                      value={updatedService.serviceName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={updatedService.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Service Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="serviceImage"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditingService(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ServiceTable;
