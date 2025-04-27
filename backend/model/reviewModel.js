const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Ensure the User model is defined and imported correctly
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Review', ReviewSchema); // Ensure this is being exported as Review
