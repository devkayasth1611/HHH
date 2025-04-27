const userSchema = require("../model/userModel");

exports.addUser = async (req, res) => {
  try {
    // Check if the email is already in use
    const existingUser = await userSchema.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered.",
        status: 400,
      });
    }

    const user = new userSchema(req.body);
    const data = await user.save();

    res.status(200).json({
      message: "User added successfully",
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong while adding the user",
      status: 500,
      error: err.message || err,
    });
  }
};



exports.getAllUser = (req,res) => {
    userSchema.find().then((data)=>{
        if(!data)
        {
            res.json({
                message: "Something went wrong while fetching the User",
                status: 400,
                error: err,
              });
        }
        else
        {
            res.json({
                message: "User fetched successfully",
                status: 200,
                data: data,
              });
        }
    }).catch((err)=>{
        res.json({
            message: "Something went wrong while fetching the User",
            status: 400,
            error: err,
          });
    })
}


exports.getUserById = (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.json({
          message: "Something went wrong while fetching the User",
          status: 400,
          error: err,
        });
      } else {
        res.json({
          message: "User fetched By id successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching the User",
        status: 400,
        error: err,
      });
    });
};

// Get user by email
exports.getUserByEmail = (req, res) => {
  const { email } = req.params;

  userSchema.findOne({ email })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "User not found",
          status: 404,
        });
      } else {
        res.status(200).json({
          message: "User fetched successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while fetching user details",
        status: 500,
        error: err.message || err,
      });
    });
};




exports.updateUserByEmail = (req, res) => {
  const { email } = req.params; // Get the email from the request parameters

  userSchema
    .findOneAndUpdate(
      { email: email }, // Change query to find by email
      { $set: req.body },
      { new: true } // Option to return the modified document
    )
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "User not found",
          status: 404,
        });
      } else {
        res.status(200).json({
          message: "User updated successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong while updating the user",
        status: 500,
        error: err.message || err, // Include error message for better debugging
      });
    });
};



  exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    console.log(id);
    userSchema.findOneAndDelete(
      {
        _id: id,
      },
    )
    .then((data) => {
      if (!data) {
        res.json({
          message: "Something went wrong while deleting the User",
          status: 400,
          error: err,
        });
      } else {
        res.json({
          message: "User deleted successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while Deleting User",
        status: 400,
        error: err,
      });
    })
  }