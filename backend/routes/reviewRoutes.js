const express = require('express');
const router = express.Router()
const reviewController = require("../controller/reviewController");

router.post('/review',reviewController.addReview);
router.get("/review",reviewController.getAllReview);
router.get("/review/:id",reviewController.getReviewById);
router.put("/review/:id",reviewController.updateReviewById);
router.delete("/review/:id",reviewController.deleteReviewById);

module.exports = router