const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token || token === undefined) {
    
    //Bu url test amaçlı girilmiştır
    // burası login sayfasına gitmesi gerekiyor
    return res.redirect('http://localhost:5000/auth');
  } else {

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const {id: userId, username, exp} = data
      

      return res.json({token, userId, username, True: true, middleware: 'authorization', exp})
      
    } catch (error) {
      console.log(error.message);
    }
    return res.redirect('http://localhost:5000/auth');
  
  }

};

module.exports = authorization;