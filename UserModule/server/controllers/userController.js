const db = require("../models");
const User = db.User;

const getListOfUsers = (req, res) => {
  res.send("[get] getListOfUsers");
};

const createUser = (req, res) => {
  res.send("[post] createUser");
};

const getUserInfo = (req, res) => {
  res.send("[get] getUserInfo");
};

const updateUser = (req, res) => {
  res.send("[put] updateUser");
};

const deleteUser = (req, res) => {
  res.send("[delete] deleteUser");
};

module.exports = {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
};
