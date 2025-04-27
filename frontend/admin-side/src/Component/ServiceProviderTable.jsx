import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

function ServiceProviderTable() {
  const [providers, setProviders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProvider, setCurrentProvider] = useState({
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceName: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/serviceproviders/serviceprovider")
      .then((response) => {
        if (response.data && response.data.status === 200) {
          setProviders(response.data.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching service providers:", error);
      });
  }, []);

  const handleEditClick = (provider) => {
    setIsEditing(true);
    setCurrentProvider(provider);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProvider((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update this provider?")) {
      axios
        .post(
          `http://localhost:3000/serviceproviders/serviceprovider/${currentProvider._id}`,
          currentProvider
        )
        .then((response) => {
          if (response.data && response.data.status === 200) {
            setProviders((prev) =>
              prev.map((provider) =>
                provider._id === currentProvider._id
                  ? currentProvider
                  : provider
              )
            );
            setIsEditing(false);
          } else {
            console.error("Failed to update provider:", response);
          }
        })
        .catch((error) => {
          console.error("Error updating provider:", error);
        });
    }
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      axios
        .delete(`http://localhost:3000/serviceproviders/serviceprovider/${id}`)
        .then((response) => {
          if (response.data && response.data.status === 200) {
            setProviders((prev) => prev.filter((p) => p._id !== id));
          } else {
            console.error("Failed to delete provider:", response);
          }
        })
        .catch((error) => {
          console.error("Error deleting provider:", error);
        });
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Service Providers Table</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Service Providers</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service Provider Table</h5>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Service Name</th>
                        <th>Password</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider) => (
                        <tr key={provider._id}>
                          <td>{provider.fullName}</td>
                          <td>{provider.email}</td>
                          <td>{provider.phoneNumber}</td>
                          <td>{provider.serviceName}</td>
                          <td>{provider.password}</td>
                          <td>
                            <button
                              className="edit-btn"
                              onClick={() => handleEditClick(provider)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteClick(provider._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {isEditing && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Edit Service Provider</h5>
                <form className="row g-3" onSubmit={handleFormSubmit}>
                  <div className="col-12">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={currentProvider.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={currentProvider.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={currentProvider.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      name="password"
                      value={currentProvider.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="serviceName"
                      value={currentProvider.serviceName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
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

export default ServiceProviderTable;
