const serviceProviderSchema = require("../model/serviceProviderModel");

exports.addServiceProvider = async (req, res) => {
  try {
    // Log request body to ensure correct data is being received
    console.log("Request Body:", req.body);

    // Check if the email is already in use
    const existingUser = await serviceProviderSchema.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered.",
        status: 400,
      });
    }

    const serviceProvider = new serviceProviderSchema(req.body);
    const data = await serviceProvider.save();

    res.status(200).json({
      message: "Service Provider added successfully",
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error("Error while adding service provider:", err);
    res.status(500).json({
      message: "Something went wrong while adding the Service Provider",
      status: 500,
      error: err.message || err,
    });
  }
};

exports.getAllServiceProvider = (req, res) => {
  serviceProviderSchema.find()
    .then((data) => {
      if (!data) {
        res.json({
          message: "Something went wrong while fetching the Service Provider",
          status: 400,
          error: err,
        });
      } else {
        res.json({
          message: "Service Provider fetched successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching the Service Provider",
        status: 400,
        error: err,
      });
    });
};
