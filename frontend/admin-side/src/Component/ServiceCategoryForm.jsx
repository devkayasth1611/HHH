import React, { useState, useEffect } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ServiceCategoryForm() {
  const [mainServices, setMainServices] = useState([]); // To store fetched main services
  const [selectedMainServiceId, setSelectedMainServiceId] = useState(""); // To store selected main service ID
  const [subSubServices, setSubSubServices] = useState([""]); // To store dynamic subSubServiceName fields

  // Fetch the list of main services on component mount
  useEffect(() => {
    const fetchMainServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/services/service'); // Adjust the API endpoint
        setMainServices(response.data.data);
      } catch (error) {
        console.error("Error fetching main services", error);
      }
    };
    fetchMainServices();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      mainServiceId: selectedMainServiceId, // Selected main service ID
      description: event.target.description.value,
      subServiceName: event.target.subServiceName.value,
      subSubServices: subSubServices, // Include all subSubServiceName values
    };

    try {
      const response = await axios.post('http://localhost:3000/subservices/subservice', formData);
      if (response.status === 200) {
        alert('Service category data added successfully!');
        window.location.reload();
      } else {
        alert('Error adding service category!');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // Handle adding new subSubServiceName field
  const addSubSubServiceField = () => {
    setSubSubServices([...subSubServices, ""]);
  };

  // Handle removing a subSubServiceName field
  const removeSubSubServiceField = (index) => {
    setSubSubServices(subSubServices.filter((_, i) => i !== index));
  };

  // Handle input change for each subSubServiceName
  const handleSubSubServiceChange = (index, event) => {
    const updatedSubSubServices = [...subSubServices];
    updatedSubSubServices[index] = event.target.value;
    setSubSubServices(updatedSubSubServices);
  };

  // Handle main service selection and store the ID of the selected service
  const handleMainServiceChange = (event) => {
    const selectedServiceId = event.target.value; // Get the selected service ID
    setSelectedMainServiceId(selectedServiceId); // Store the selected service ID
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Form Elements</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Forms</li>
              <li className="breadcrumb-item active">Elements</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service Category Form</h5>

                  {/* <!-- General Form Elements --> */}
                  <form onSubmit={handleSubmit}>
                    {/* Main Service Dropdown */}
                    <div className="row mb-3">
                      <label htmlFor="mainService" className="col-sm-2 col-form-label">
                        Select Main Service
                      </label>
                      <div className="col-sm-12">
                        <select
                          className="form-control"
                          id="mainService"
                          name="mainService"
                          required
                          onChange={handleMainServiceChange} // Handle service change
                        >
                          <option value="">Select Service</option>
                          {mainServices.map(service => (
                            <option key={service._id} value={service._id}> {/* Use service._id */}
                              {service.serviceName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="subServiceName" className="col-sm-2 col-form-label">
                        Sub Service Name
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="subServiceName"
                          name="subServiceName"
                          placeholder="Enter sub-service name"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="description" className="col-sm-2 col-form-label">
                        Description
                      </label>
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Enter description"
                          required
                        ></textarea>
                      </div>
                    </div>

                    {/* Dynamic subSubServiceName Fields */}
                    {subSubServices.map((subSubService, index) => (
                      <div key={index} className="row mb-3">
                        <label className="col-sm-2 col-form-label">Sub Sub Service Name {index + 1}</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            value={subSubService}
                            onChange={(e) => handleSubSubServiceChange(index, e)}
                            required
                          />
                        </div>
                        <div className="col-sm-2">
                          {subSubServices.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeSubSubServiceField(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button type="button" className="btn btn-secondary mb-3" onClick={addSubSubServiceField}>
                      Add Another Sub Sub Service
                    </button>

                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Add Service
                      </button>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ServiceCategoryForm;
