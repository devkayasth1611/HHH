import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ReviewTable() {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews/review")
      .then((response) => {
        setReviews(response.data.data); // Assuming the data structure has a 'data' field
      })
      .catch((error) => {
        console.error("There was an error fetching the reviews!", error);
      });
  }, []);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Review Tables</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Reviews</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Review Table</h5>

                  {/* Table with stripped rows */}
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>User Name</th> {/* Display User Name */}
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date</th>
                        {/* <th>Last Updated</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review) => (
                        <tr key={review._id}>
                          <td>
                            {/* Check if userId is populated and display user's full name */}
                            {review.userId ? review.userId.fullName : "Unknown"}
                          </td>
                          <td>{review.rating}</td>
                          <td>{review.comment}</td>
                          <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                          {/* <td>{new Date(review.updatedAt).toLocaleDateString()}</td> */}
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
      </main>
    </div>
  );
}

export default ReviewTable;
