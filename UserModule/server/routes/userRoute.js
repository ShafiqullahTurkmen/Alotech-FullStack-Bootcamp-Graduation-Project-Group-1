const express = require("express");
const router = express.Router();

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

router.route("/").get(getListOfUsers).post(createUser);

router.route("/:id").get(getUserInfo).put(updateUser).delete(deleteUser);

module.exports = router;
