const express = require('express');
const router = express.Router()
const serviceProvider = require("../controller/serviceProviderController");

router.post("/serviceprovider",serviceProvider.addServiceProvider);
router.get("/serviceprovider",serviceProvider.getAllServiceProvider);

module.exports = router