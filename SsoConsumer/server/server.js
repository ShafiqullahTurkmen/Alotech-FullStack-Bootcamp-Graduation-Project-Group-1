const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authentication = require("./middlewares/authentication")

const db = require("./models");

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/",authentication, (req, res) => {
  res.send("test sso consumer ");
});

const PORT = process.env.PORT || 9005;

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
