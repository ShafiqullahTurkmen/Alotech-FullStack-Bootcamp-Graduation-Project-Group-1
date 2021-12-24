const db = require("../models");
const requesIp = require("request-ip")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const Token = db.Token;
const sequelize = db.sequelize;

const loginUser = async (req, res) => {
  const { username, user_password } = req.body;

  const [user, meta] = await sequelize.query(
    "SELECT * FROM users WHERE username = :_username;",
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
      time_to_live = '30s' // 30 saniye 

      const token = jwt.sign(
        { id: user_id, username: loginUsername },
        process.env.JWT_SECRET, { expiresIn: time_to_live }
      );  

      const data = jwt.verify(token, process.env.JWT_SECRET);
      const {exp} = data
      
      //token expire date
      var d = new Date(exp * 1000);
      const expires = d.toString(); 
      console.log(d.toString(), '//token expire date' ) 

      let ip = requesIp.getClientIp(req) // gets ip
      console.log(ip);

      const createdAt = new Date(Date.now());
      console.log(createdAt, 'created At');

      // Create Token instance in Token Table
        const tokenTableRow = async () => {
          const tokenrow = await Token.create({token, expires, createdAt, time_to_live, ip})
          return tokenrow;
        }

        console.log(tokenTableRow());
      
      // store token in cookie
      res.cookie("access_token", token, {
          httpOnly: true,
          secure: false,
        }).status(200).redirect('http://localhost:5000')

        
    } else {
      res.json({ msg: "şifre yanliş", FALSE: false });
    }
  } else {
    res.json({ msg: "User not found", FALSE:  false });
  }
};

//Dummy Controller, Just For Test
const getLoginPage = (req, res) => {
  res.json({msg: 'Burası frontend login sayfası olması gerekiyor, bu işlem test amaçlı yapılmıştır'})
}

module.exports = {
  loginUser,
  getLoginPage
};
