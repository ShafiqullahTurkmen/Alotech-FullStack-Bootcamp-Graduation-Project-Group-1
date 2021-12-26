const db = require("../models");
const requesIp = require("request-ip");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const Token = db.Token;
const sequelize = db.sequelize;

const loginUser = async (req, res) => {
  const { username, user_password, redirectURL } = req.body;
  console.log("url: " + redirectURL);

  const [user, meta] = await sequelize.query(
    "SELECT * FROM users WHERE username = :_username",
    {
      replacements: { _username: username },
    }
  );
  if (user.length && user[0].username === username) {
    const loginUser = user[0];

    salt_password = user_password + process.env.SALT_PASS;
    user_password_hash = CryptoJS.SHA256(salt_password).toString();
    console.log(user[0].user_password);
    console.log(user_password_hash);

    if (user_password_hash === loginUser.user_password) {
      loginUsername = loginUser.username;
      user_id = loginUser.id;

      console.log(loginUser);

      //JWT
      time_to_live = "30s"; // 30 saniye

      const token = jwt.sign(
        { id: user_id, username: loginUsername },
        process.env.JWT_SECRET,
        { expiresIn: time_to_live }
      );

      const data = jwt.verify(token, process.env.JWT_SECRET);
      const { exp } = data;

      //
      //token has one day to expire
      var d = new Date(exp * 1000 + 3 * 60 * 60 * 1000);
      const expires = d.toString();
      console.log(d.toString(), "//token expire date");

      let user_ip = requesIp.getClientIp(req); // gets ip
      console.log(user_ip);

      const createdAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
      console.log(createdAt, "created At");

      //dummy string, for test
      const source_url = "Sso Consumer Url";

      // Create Token instance in Token Table
      const tokenTableRow = async () => {
        const tokenrow = await Token.create({
          token,
          expires,
          createdAt,
          time_to_live,
          user_ip,
          source_url,
        });
        return tokenrow;
      };

      tokenTableRow();

      // store token in cookie
      res.status(200).json({ url: redirectURL, token: token });
    } else {
      res.json({ msg: "Wrong password" });
    }
  } else {
    res.json({ msg: "User not found" });
  }
};

//Dummy Controller, Just For Test
const getLoginPage = (req, res) => {
  const redirectURL = req.query.redirectURL;
  res.redirect(`http://127.0.0.1:3000?redirectURL=${redirectURL}`); //redirect sso auth login page
};

module.exports = {
  loginUser,
  getLoginPage,
};
