const express = require("express");
const router = express.Router();
const { loginUser, getLoginPage } = require("../controllers/auth");
const { isTokenValid } = require("../controllers/validation");

router.route("/").post(loginUser);
router.route("/").get(getLoginPage);

router.route("/token").post(isTokenValid);

module.exports = router;
