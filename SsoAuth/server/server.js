const express = require("express");
const db = require("./models");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("test");
});

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
