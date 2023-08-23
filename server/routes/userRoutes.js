// Creating routes to endpoints
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router();


router.post('/loginUser',authController.loginUser);
router.post('/logoutUser',authController.logoutUser);
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/createNewUser', authController.createNewUser);


router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);


module.exports = router;