const express = require('express');
const router = express.Router();
const {loginUser, getLoginPage} = require('../controllers/auth');


router.route('/').post(loginUser)

//test amaçlı
router.route('/').get(getLoginPage)

module.exports = router;