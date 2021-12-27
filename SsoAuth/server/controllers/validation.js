const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;
const sequelize = db.sequelize;

const isTokenValid = async (req, res) => {
  const token = req.body.token;
  console.log(token);

  if (!token || token === undefined) {
    return res.json({ valid: false, msg: "empty token" });
  }

  const [value, meta] = await sequelize.query(
    "SELECT token FROM tokens WHERE token = :_token",
    {
      replacements: { _token: token },
    }
  );

  if (!value.length) {
    return res.json({ valid: false, msg: "unregistered token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.json({ valid: false, msg: "token expired" });
    } else {
      return res.json({ valid: true, msg: "token valid" });
    }
  });
};

module.exports = {
  isTokenValid,
};
