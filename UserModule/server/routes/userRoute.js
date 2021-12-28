const express = require("express");
const router = express.Router();
const {
  createUserValidation,
  updateUserValidation,
  validToken,
  checkUser,
  checkAdmin,
} = require("../middlewares/validation");

const {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

router
  .route("/")
  .get(validToken, checkAdmin, getListOfUsers)
  .post(validToken, checkAdmin, createUserValidation, createUser);

router
  .route("/:id")
  .get(validToken, checkUser, getUserInfo)
  .put(validToken, checkAdmin, updateUserValidation, updateUser)
  .delete(validToken, checkAdmin, deleteUser);

module.exports = router;
