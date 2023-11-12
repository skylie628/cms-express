const router = require('express').Router();

// controller
const userController = require('../controller/user.controller');

// @route: GET /api/user
// @desc: get all users
router.get('/', userController.getAllUsers);


// @route: POST /api/user/signup
// @desc: create new user
router.post('/signup', userController.signup);


module.exports = router;

