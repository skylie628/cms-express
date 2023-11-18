const router = require("express").Router();

// controller
const userController = require("../controller/user.controller");

// @route: GET /api/user
// @desc: get all users

// @route: POST /api/user/signup
// @desc: create new user
router.post("/signup", userController.signup);
// signin - add session
router.post("/signin", userController.signin);
// logout - delete session
router.delete("/logout", userController.logout);
// reset password
router.put("/reset-password", userController.resetPassword);
// get all user
router.get("/", userController.getAllUsers);
// get user detail
router.get("/:id", userController.getUser);
// update user information
router.put("/:id", userController.updateUser);
// delete user account
router.delete("/:id", userController.deleteUser);

module.exports = router;
