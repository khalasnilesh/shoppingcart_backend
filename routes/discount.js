const express = require('express');
const router = express.Router();
const discoutController = require('../controllers/discount');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', discoutController.getAllDiscount);
router.post('/add_discount', discoutController.addDiscount);

module.exports = router;