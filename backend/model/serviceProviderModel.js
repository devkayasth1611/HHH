const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceProviderSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    review: {
      type: String,
      trim: true,
    },
    userEmail: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    roleId: {
      type: Number,
      default: 2, // 2 = Service Provider
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ServiceProvider", ServiceProviderSchema);
