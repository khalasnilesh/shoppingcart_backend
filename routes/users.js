const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/forgotpassword', userController.forgotpassword);

module.exports = router;