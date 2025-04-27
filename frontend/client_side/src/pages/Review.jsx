import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Review() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the userId passed from the BookingPage
  const userId = location.state?.userId;

  // Log the userId to confirm it's being passed
  console.log("Received User ID in Review Page:", userId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable button during submission
  
    // Log the review data before sending
    console.log("Review Data being sent:", {
      userId,
      rating,
      comment,
    });
  
    const reviewData = {
      userId,
      rating,
      comment,
    };
  
    try {
      const response = await axios.post("http://localhost:3000/reviews/review", reviewData);
      if (response.status === 200 || response.status === 201) {
        alert("Review submitted successfully!");
        setRating(0);
        setComment("");
        navigate("/"); // Redirect to the home page
      } else {
        alert("Error submitting review!");
      }
    } catch (error) {
      console.error("There was an error submitting the review!", error.response ? error.response.data : error);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };
  

  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-center">
          <h2 className="title1">Review Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <div id="rating" className="d-flex">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        style={{ display: "none" }}
                      />
                      <i
                        className={`fa-star ${ratingValue <= (hover || rating) ? "fas" : "far"}`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          marginRight: "8px",
                          color: "#f9b116",
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea
                className="form-control"
                id="comment"
                rows="4"
                placeholder="Enter your comment"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;
