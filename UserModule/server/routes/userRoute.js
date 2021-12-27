const express = require("express");
const router = express.Router();
const {createUserValidation, updateUserValidation} = require('../middlewares/validation');

const {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

router.use((req, res, next) => {
  console.log("ROUTER TOKEN AUTH MIDDLEWARE");
  next();
});

router.route("/")
  .get(getListOfUsers)
  .post(createUserValidation, createUser);

router.route("/:id")
  .get(getUserInfo)
  .put(updateUserValidation, updateUser)
  .delete(deleteUser);

module.exports = router;
