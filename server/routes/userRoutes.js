// Creating routes to endpoints
const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.route('/getAllUsers', ).get(userController.getAllUsers);
router.route('/createNewUser', ).post(userController.createNewUser);
router.route('/LoginUser', ).post(userController.loginUser);

module.exports = router;