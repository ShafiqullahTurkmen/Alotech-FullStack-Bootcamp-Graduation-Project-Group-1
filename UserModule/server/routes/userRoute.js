const express = require("express");
const router = express.Router();

// Import controllers
const {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

// /users route for all users
router
  .route("/")
  // Get a user
  .get(getListOfUsers)
  // Create a new user
  .post(createUser);
// Delete a user

// /users/:id route for single user object
router
  .route("/:id")
  // Get a user
  .get(getUserInfo)
  // Update a user
  .put(updateUser)
  // Delete a user
  .delete(deleteUser);

// Export the router
module.exports = router;
