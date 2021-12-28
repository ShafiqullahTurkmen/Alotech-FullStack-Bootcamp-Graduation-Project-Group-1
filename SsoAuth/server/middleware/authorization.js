const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;
const sequelize = db.sequelize;

const authorization = async (req, res) => {
  const [value, meta] = await sequelize.query(
    "SELECT token, user_id FROM tokens WHERE user_id = (SELECT id FROM users WHERE username = :_username)",
    {
      replacements: { _username: req.body.username },
    }
  );

  if (!value.length) {
    return res.json({ auth: false, msg: "unknown token" });
  }

  const token = value[0].token;
  const user_id = value[0].user_id;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      Token.deleteToken(token);
      return res.json({ auth: false, msg: "token expired" });
    } else {
      return res.json({
        auth: true,
        msg: "authorization success",
        user_id: user_id,
        isAdmin: decoded.isAdmin,
        token: token,
      });
    }
  });
};

module.exports = authorization;
