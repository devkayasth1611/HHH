const express = require('express');
const router = express.Router()
const userController = require("../controller/userController");
const validate = require('../middleware/zodMiddleware');
const userValidation = require('../util/userValidation'); 

router.post('/user',validate(userValidation),userController.addUser)
router.get("/user",userController.getAllUser)
router.get("/user/:id",userController.getUserById);
router.get('/user/email/:email', userController.getUserByEmail);
router.put('/user/:email', userController.updateUserByEmail);
router.delete("/user/:id",userController.deleteUserById);

module.exports = router