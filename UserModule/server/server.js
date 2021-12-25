require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const userRoute = require("./routes/userRoute");
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("test 9000");
});

app.use("/users", userRoute);

const PORT = process.env.PORT || 9000;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
