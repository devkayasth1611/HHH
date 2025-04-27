const reviewSchema = require('../model/reviewModel'); // Correctly importing the model

// Add a new review
exports.addReview = async (req, res) => {
  const { userId, rating, comment } = req.body;

  // Validate required fields
  if (!userId || !rating || !comment) {
    return res.status(400).json({
      message: "Missing required fields: userId, rating, comment",
      status: 400,
    });
  }

  try {
    const review = new reviewSchema({ userId, rating, comment }); // Using Review to create a new review
    const data = await review.save();
    res.json({
      message: "Review added successfully",
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error("Error while adding review:", err);  // Log detailed error
    res.status(400).json({
      message: "Something went wrong while adding the review",
      status: 400,
      error: err.message,
    });
  }
};



// Get all reviews
exports.getAllReview = (req, res) => {
  reviewSchema
    .find()
    .populate('userId', 'fullName email')  // Make sure this is properly populated
    .then((data) => {
      console.log(data);  // Debug log to check the populated data
      if (!data) {
        res.json({
          message: "Something went wrong while fetching the Review",
          status: 400,
        });
      } else {
        res.json({
          message: "Reviews fetched successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching the Review",
        status: 400,
        error: err,
      });
    });
};




// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const data = await reviewSchema.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Review not found",
        status: 404,
      });
    }
    res.json({
      message: "Review fetched successfully",
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong while fetching the Review",
      status: 400,
      error: err.message,
    });
  }
};

// Update review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const data = await reviewSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).json({
        message: "Review not found",
        status: 404,
      });
    }
    res.json({
      message: "Review updated successfully",
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong while updating the Review",
      status: 400,
      error: err.message,
    });
  }
};

// Delete review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const data = await reviewSchema.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Review not found",
        status: 404,
      });
    }
    res.json({
      message: "Review deleted successfully",
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong while deleting the Review",
      status: 400,
      error: err.message,
    });
  }
};
