const express = require('express');
const router = express.Router()
const subServiceController = require("../controller/subServiceController");
// const validate = require('../middleware/zodMiddleware');
// const serviceValidation = require('../util/serviceValidation'); 


router.post('/subservice',subServiceController.addSubService);
router.get("/subservice",subServiceController.getAllSubService);
router.get("/subservice/:id",subServiceController.getSubServiceById);
router.post("/subservice/:id",subServiceController.updateSubServiceById);
router.delete("/subservice/:id",subServiceController.deleteSubServiceById);

module.exports = router