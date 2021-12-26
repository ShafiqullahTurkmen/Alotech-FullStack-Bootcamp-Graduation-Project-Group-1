const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;

const authentication = (req, res, next) => {
  // const {token, userId, username, expiresIn } = req.cookies.credential;
  const credentials = req.cookies.credential;
  console.log(credentials);

  if (!credentials || credentials === undefined) {
    console.log('credentials bulunamadı');
    
    return res.redirect("http://localhost:5000"); // return url after


  }

  res.clearCookie('access_token');
  res.clearCookie('credential');

  return next();
}

module.exports = authentication;