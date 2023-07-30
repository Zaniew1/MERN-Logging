// Creating routes to endpoints
const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.route('/createNewUser').post(authController.createNewUser);
router.route('/loginUser').post(authController.loginUser);
router.post('/forgetPassword', authController.forgetPassword);
router.post('/resetPassword', authController.resetPassword);


router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);

router.route('/').get(userController.getAllUsers).post
router.route('/:id').get(userController.getUser)

module.exports = router;