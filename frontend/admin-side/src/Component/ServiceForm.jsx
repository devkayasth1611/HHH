import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

function ServiceForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(); // FormData to handle file upload
    formData.append("serviceName", event.target.serviceName.value);
    formData.append("description", event.target.description.value);
    formData.append("price", event.target.price.value); // Append price
    formData.append("serviceImage", event.target.serviceImage.files[0]); // Get the file

    try {
      const response = await axios.post("http://localhost:3000/services/service", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });

      if (response.status === 200) {
        alert("Service data added successfully!");
        window.location.reload();
      } else {
        alert("Error adding service!");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Service Form</h1>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Service Form</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="serviceName" className="col-sm-2 col-form-label">
                        Service Name
                      </label>
                      <div className="col-sm-12">
                        <input type="text" className="form-control" id="serviceName" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="description" className="col-sm-2 col-form-label">
                        Description
                      </label>
                      <div className="col-sm-12">
                        <textarea className="form-control" id="description"></textarea>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="price" className="col-sm-2 col-form-label">
                        Price
                      </label>
                      <div className="col-sm-12">
                        <input type="number" className="form-control" id="price" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="serviceImage" className="col-sm-2 col-form-label">
                        Service Image
                      </label>
                      <div className="col-sm-12">
                        <input className="form-control" type="file" id="serviceImage" />
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        ADD
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ServiceForm;
