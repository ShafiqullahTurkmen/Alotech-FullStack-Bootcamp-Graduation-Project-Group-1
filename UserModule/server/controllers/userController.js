const db = require("../models");
const CryptoJs = require('crypto-js')
const sequelize = db.sequelize;

const getListOfUsers = (req, res) => {
  sequelize
    .query("CALL getListOfUsers ()")
    .then((v) => {
      res.status(201).json({ status: "success", message: "Users found", users: v });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err });
    });
};

const createUser = (req, res) => {
  const { username, user_name, user_surname, user_password, user_email, user_type } = req.body;

  // hashs and salts password
  salt_password = user_password + process.env.SALT_PASS;
  user_password_hash = CryptoJs.SHA256(salt_password).toString();
  console.log(user_password_hash);


  sequelize
    .query(
      "CALL createUser (:_username, :_user_name, :_user_surname, :_user_password, :_user_email, :_user_type)",
      {
        replacements: {
          _username: username,
          _user_name: user_name,
          _user_surname: user_surname,
          _user_password: user_password_hash,
          _user_email: user_email,
          _user_type: user_type,
        },
      },
    )
    .then((v) => {
      res.status(201).json({ status: "success", message: "User created", user: v[0] });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err });
    });
};

const getUserInfo = (req, res) => {
  const user_id = req.params.id;
  sequelize
    .query("CALL getUserInfo (:_user_id)", { replacements: { _user_id: user_id } })
    .then((v) => {
      res.status(201).json({ status: "success", message: "User found", user: v });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err });
    });
};

const updateUser = (req, res) => {
  const user_id = req.params.id;
  const { username, user_name, user_surname, user_password, user_email, user_type } = req.body;
  sequelize
    .query(
      "CALL updateUser (:_user_id, :_username, :_user_name, :_user_surname, :_user_password, :_user_email, :_user_type)",
      {
        replacements: {
          _user_id: user_id,
          _username: username,
          _user_name: user_name,
          _user_surname: user_surname,
          _user_password: user_password,
          _user_email: user_email,
          _user_type: user_type,
        },
      },
    )
    .then((v) => {
      res.status(201).json({ status: "success", message: "User updated", user: v[0] });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err });
    });
};

const deleteUser = (req, res) => {
  const user_id = req.params.id;
  sequelize
    .query("CALL deleteUser (:_user_id)", { replacements: { _user_id: user_id } })
    .then((v) => {
      res.status(201).json({ status: "success", message: "User deleted" });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", message: err });
    });
};

module.exports = {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
};
