const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    adminName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    roleId: {
      type: Number,
      default: 1, // 1 = Admin
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
