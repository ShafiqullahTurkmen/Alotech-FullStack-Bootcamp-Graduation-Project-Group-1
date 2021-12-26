require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const authRoute = require("./routes/authRout");

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

//middleware
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
