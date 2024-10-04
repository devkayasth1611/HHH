const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");

// Use multer's upload middleware for the image
router.post("/service", serviceController.upload.single("serviceImage"), serviceController.addService);
router.get("/service", serviceController.getAllService);
router.get("/service/:id", serviceController.getServiceById);
router.put("/service/:id", serviceController.upload.single("serviceImage"),serviceController.updateServiceById);
router.delete("/service/:id", serviceController.deleteServiceById);

module.exports = router;
