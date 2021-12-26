const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;

const isAccessTokenValid = (req, res) => {
  const token = req.cookies.access_token;
  if (!token || token === "undefined" || token === undefined) {
    res.json({ status: "null token" });
    return;
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const tokenTableRow = async () => {
          const tokenrow = await Token.destroy({
            where: { token: token },
          });
          console.log("token delete", tokenrow);
          res.json({ status: "error" });
          return;
        };
        tokenTableRow();
      } else {
        res.json({ status: "success" });
        return;
      }
    });
  }
};

module.exports = {
  isAccessTokenValid,
};
