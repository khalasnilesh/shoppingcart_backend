const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
const paymentController = require('../controllers/payment')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//router.post('/', paymentController.addPayment);
router.post('/make_payment', paymentController.makePayment);

module.exports = router;