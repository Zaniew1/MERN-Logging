// Creating routes to endpoints
const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.route('/createNewUser').post(userController.createNewUser);
router.route('/loginUser').post(userController.loginUser);
// router.route('/forgetPassword/:token').patch(userController.forgetPassword);


router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);

module.exports = router;