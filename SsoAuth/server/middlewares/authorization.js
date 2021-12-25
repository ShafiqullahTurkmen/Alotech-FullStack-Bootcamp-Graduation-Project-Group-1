const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;

const authorization = (req, res) => {
  const token = req.cookies.access_token;
  let data;
  if (!token || token === undefined) {
    //Bu url test amaçlı girilmiştır
    // burası login sayfasına gitmesi gerekiyor

    // react login page
    return res.redirect("http://127.0.0.1:3000");

    // backend login page
    // return res.redirect('http://localhost:5000/auth');
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          try {
            // deletes expired Token from Token Table
            const tokenTableRow = async () => {
              const tokenrow = await Token.destroy({
                where: { token: token },
              });
              console.log("token delete ///", tokenrow);
            };
            tokenTableRow();
          } catch (error) {
            console.log(error);
          }
        }

        data = decoded;
      });
    } catch (error) {
      console.log(error.message);
    }

    if (data) {
      const { id: userId, username, exp } = data;

      var expiresIn = new Date(exp * 1000 + 3 * 60 * 60 * 1000);
      //for sso consumer
      const credentials = {
        token,
        userId,
        username,
        True: true,
        middleware: "authorization",
        expiresIn,
      };

      console.log(credentials);

      return res
        .cookie("credential", credentials, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .redirect("http://127.0.0.1:9005"); // Sso consumer url
    }

    // react login page
    return res.redirect("http://127.0.0.1:3000");

    // backend login page
    // return res.redirect('http://localhost:5000/auth');
  }
};

module.exports = authorization;
