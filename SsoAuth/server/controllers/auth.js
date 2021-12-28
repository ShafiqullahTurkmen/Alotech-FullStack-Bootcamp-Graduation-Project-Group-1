const db = require("../models");
const requesIp = require("request-ip");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const Token = db.Token;
const sequelize = db.sequelize;

const services = [
  "http://127.0.0.1:3005",
  "http://localhost:3005",
  "http://127.0.0.1:9010",
  "http://localhost:9010",
];

const loginUser = async (req, res) => {
  const { username, user_password, redirectURL } = req.body;
  const [user, meta] = await sequelize.query(
    "SELECT * FROM users WHERE username = :_username",
    {
      replacements: { _username: username },
    }
  );

  if (!user.length) {
    return res.json({ auth: false, msg: "user not found" });
  }

  const loginUser = user[0];

  let salt_password = user_password + process.env.SALT_PASS;
  let user_password_hash = CryptoJS.SHA256(salt_password).toString();

  if (user_password_hash !== loginUser.user_password) {
    return res.json({ auth: false, msg: "wrong password" });
  }

  if (!redirectURL) {
    return res.json({ auth: false, msg: "empty redirect" });
  } else {
    if (services.includes(redirectURL) === false) {
      return res.json({ auth: false, msg: "unauthorized redirect" });
    }
  }

  const [token_status, token_meta] = await sequelize.query(
    "SELECT token FROM tokens WHERE user_id = :_user_id",
    {
      replacements: { _user_id: loginUser.id },
    }
  );

  if (token_status.length) {
    const old_token = token_status[0].token;
    jwt.verify(old_token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        Token.deleteToken(old_token);
      } else {
        return res.json({
          auth: true,
          msg: "login success",
          user_id: loginUser.id,
          token: old_token,
        });
      }
    });
  }

  const time_to_live = "1d";
  const isAdmin = loginUser.user_type === "admin";

  const token = jwt.sign(
    { id: loginUser.id, username: loginUser.username, isAdmin: isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: time_to_live }
  );

  const token_data = jwt.verify(token, process.env.JWT_SECRET);
  const { exp } = token_data;
  var d = new Date(exp * 1000 + 3 * 60 * 60 * 1000);

  const user_ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "0.0.0.0";
  const createdAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const source_url = redirectURL;
  const expires = d.toString();

  Token.createToken(
    loginUser.id,
    token,
    expires,
    createdAt,
    time_to_live,
    user_ip,
    source_url
  );

  return res.status(201).json({
    auth: true,
    msg: "login success",
    user_id: loginUser.id,
    token: token,
  });
};

const getLoginPage = (req, res) => {
  const redirectURL = req.query.redirectURL;
  res.redirect(`http://127.0.0.1:3000?redirectURL=${redirectURL}`); //redirect sso auth login page
};

module.exports = {
  loginUser,
  getLoginPage,
};
