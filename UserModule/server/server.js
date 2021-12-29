require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const userRoute = require("./routes/userRoute");

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test 9005");
});

app.use("/users", userRoute);

const PORT = process.env.PORT || 9005;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
