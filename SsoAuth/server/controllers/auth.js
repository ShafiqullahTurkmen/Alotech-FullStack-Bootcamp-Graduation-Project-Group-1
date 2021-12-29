const db = require("../models");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sessionGen = require("nanoid");

const Token = db.Token;
const sequelize = db.sequelize;

const services = [
  "http://127.0.0.1:3010",
  "http://127.0.0.1:9010",
  "http://127.0.0.1:5000",
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

  console.log("loginUser", loginUser);

  let salt_password = user_password + process.env.SALT_PASS;
  let user_password_hash = CryptoJS.SHA256(salt_password).toString();

  console.log("SALT", salt_password);
  console.log("USER PASSWORD HASH", user_password_hash);

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
    "SELECT token, session FROM tokens WHERE user_id = :_user_id",
    {
      replacements: { _user_id: loginUser.id },
    }
  );

  if (token_status.length) {
    console.log("SESSION FROM DATABASE", token_status[0].session);
    const old_token = token_status[0].token;
    jwt.verify(old_token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        Token.deleteToken(old_token);
      } else {
        return res.json({
          auth: true,
          msg: "session continue",
          user_id: loginUser.id,
          session: token_status[0].session,
          token: old_token,
        });
      }
    });
  }

  const time_to_live = "30d";
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
  const session = sessionGen.nanoid();

  Token.createToken(
    loginUser.id,
    token,
    session,
    expires,
    createdAt,
    time_to_live,
    user_ip,
    source_url
  );

  return res.json({
    auth: true,
    msg: "new session",
    user_id: loginUser.id,
    session: session,
    token: token,
  });
};

const getLoginPage = (req, res) => {
  const redirectURL = req.query.redirectURL;
  res.redirect(`http://127.0.0.1:3010?redirectURL=${redirectURL}`);
};

module.exports = {
  loginUser,
  getLoginPage,
};
