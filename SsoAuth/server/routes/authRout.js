const express = require("express");
const router = express.Router();
const { loginUser, getLoginPage } = require("../controllers/auth");
const { isAccessTokenValid } = require("./authorization");

router.route("/").post(loginUser);
router.route("/").get(getLoginPage);

router.route("/token").get(isAccessTokenValid);

module.exports = router;
