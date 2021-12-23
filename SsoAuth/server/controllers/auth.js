const db = require("../models");
const CryptoJS = require('crypto-js');

const User = db.User;
const sequelize = db.sequelize;

const loginUser = async (req, res) => {
  const { username, user_password } = req.body;

  const [user, meta] = await sequelize.query(
    'SELECT * FROM users WHERE username = :_username;',
    {
      replacements: {_username : username}, 
    }
  );
    if (user.length && user[0].username === username) {

      const loginUser = user[0]

      console.log(process.env.SALT_PASS);
      salt_password =  user_password + process.env.SALT_PASS;
      user_password_hash = CryptoJS.SHA256(salt_password).toString()
      console.log(user[0].user_password);
      console.log(user_password_hash);

      if (user_password_hash == loginUser.user_password) {
        res.json({loginUser, msg: 'şifre doğru'})
      }
      else {
        res.json({msg: 'şifre yanliş'})
      }
    }
    else {
      res.json({msg: 'User not found'})
    }
};

module.exports = {
  loginUser,
};
