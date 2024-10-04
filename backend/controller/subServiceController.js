const subServiceSchema = require("../model/subServiceModel");

exports.addSubService = (req,res) => {
  const subService = new subServiceSchema(req.body);
  subService.save()
  .then((data) => {
      if(!data)
      {
          res.json({
              message: "Something went wrong while adding the Category",
              status: 400,
              error: err,
          });
      }
      else
      {
          res.json({
              message: "Category add successfully",
              status: 200,
              data: data,
            });
      }
  }).catch((err)=>{
      res.json({
          message: "Something went wrong while adding the Category",
          status: 400,
          error: err,
        });
  })
}


exports.getAllSubService = (req,res) => {
  subServiceSchema.find().then((data)=>{
        if(!data)
        {
            res.json({
                message: "Something went wrong while fetching the Category",
                status: 400,
                error: err,
              });
        }
        else
        {
            res.json({
                message: "Category fetched successfully",
                status: 200,
                data: data,
              });
        }
    }).catch((err)=>{
        res.json({
            message: "Something went wrong while fetching the Category",
            status: 400,
            error: err,
          });
    })
}


exports.getSubServiceById = (req, res) => {
  subServiceSchema
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.json({
          message: "Something went wrong while fetching the Category",
          status: 400,
          error: err,
        });
      } else {
        res.json({
          message: "Category fetched By Id successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching the Category",
        status: 400,
        error: err,
      });
    });
};



exports.updateSubServiceById = (req, res) => {
  subServiceSchema
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: req.body }
      )
      .then((data) => {
        if (!data) {
          res.json({
            message: "Something went wrong while updating the Category",
            status: 400,
            error: err,
          });
        } else {
          res.json({
            message: "Category updated successfully",
            status: 200,
            data: data,
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "Something went wrong while Updating the Category",
          status: 400,
          error: err,
        });
      })
  };


  exports.deleteSubServiceById = (req, res) => {
    const id = req.params.id;
    console.log(id);
    subServiceSchema.findOneAndDelete(
      {
        _id: id,
      },
    )
    .then((data) => {
      if (!data) {
        res.json({
          message: "Something went wrong while deleting the Category",
          status: 400,
          error: err,
        });
      } else {
        res.json({
          message: "Category deleted successfully",
          status: 200,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while Deleting Category",
        status: 400,
        error: err,
      });
    })
  }