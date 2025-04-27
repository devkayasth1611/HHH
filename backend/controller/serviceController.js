const serviceSchema = require("../model/serviceModel");
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming logic
  },
});

const upload = multer({ storage: storage });

exports.upload = upload;

exports.addService = (req, res) => {
  const { serviceName, description } = req.body;
  const serviceImage = req.file ? req.file.filename : ""; // Handle file upload

  const service = new serviceSchema({
    serviceName,
    description,
    serviceImage,
  });

  service
    .save()
    .then((data) => {
      res.json({
        message: "Service added successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while adding the service",
        status: 400,
        error: err,
      });
    });
};

exports.getAllService = (req, res) => {
  serviceSchema
    .find()
    .then((data) => {
      res.json({
        message: "Services fetched successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching the services",
        status: 400,
        error: err,
      });
    });
};

exports.getServiceById = (req, res) => {
  serviceSchema
    .findById(req.params.id)
    .then((data) => {
      res.json({
        message: "Service fetched successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching the service",
        status: 400,
        error: err,
      });
    });
};

exports.updateServiceById = (req, res) => {
  serviceSchema
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true } // Return the updated document
    )
    .then((data) => {
      res.json({
        message: "Service updated successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while updating the service",
        status: 400,
        error: err,
      });
    });
};

exports.deleteServiceById = (req, res) => {
  serviceSchema
    .findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.json({
        message: "Service deleted successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while deleting the service",
        status: 400,
        error: err,
      });
    });
};
