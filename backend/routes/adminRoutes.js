const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController");

// Place the login route BEFORE the :id route
router.post('/admin/login/:id', adminController.login);
router.post('/admin', adminController.addAdmin);
router.get('/admin', adminController.getAllAdmin);
router.get('/admin/:id', adminController.getAdminById);
router.post('/admin/:id', adminController.updateAdminById);
router.delete('/admin/:id', adminController.deleteAdminById);

module.exports = router;
