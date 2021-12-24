require('dotenv').config();
const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("./models");
const authRoute = require("./routes/authRout");
const authorization = require('./middlewares/authorization')

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.get("/",authorization);

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
db.sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
