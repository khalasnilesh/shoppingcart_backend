const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',userController.getAllUsers);
router.get('/:Id',userController.getUserByID);
router.post('/register', userController.register);
router.post('/adduser', userController.addUser);
router.post('/login', userController.login);
router.put('/forgotpassword', userController.forgotpassword);
router.put('/updateprofile/:Id', userController.updateuser);
router.delete('/delete/:Id', userController.deleteUser);
router.get('/user/logout',userController.userLogout);

module.exports = router;