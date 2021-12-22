const db = require("../models");
const sequelize = db.sequelize;
const User = db.User;

const getListOfUsers = (req, res) => {
  res.send("[get] getListOfUsers");
};

const createUser = (req, res) => {
  const { username, user_name, user_surname, user_password, user_email, user_type } = req.body;
  sequelize
  .query('CALL createUser (:_username, :_user_name, :_user_surname, :_user_password, :_user_email, :_user_type)', 
        {replacements: { _username: username, _user_name: user_name, _user_surname: user_surname, _user_password: user_password, _user_email: user_email, _user_type: user_type }})
  .then((v)=>{
    console.log(v);
    res.status(201).json({status: "success", message: "User created", user: v[0]});
  })
  .catch(e=>console.log(e));
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
