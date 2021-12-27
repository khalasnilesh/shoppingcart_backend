const express = require('express');
const router = express.Router();
const discoutController = require('../controllers/discount');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', discoutController.getAllDiscount);
router.get('/getdiscountwithproductName', discoutController.getAllDiscountWithProductName);
router.post('/add_discount', discoutController.addDiscount);
router.get('/:Id', discoutController.getDiscountById);
router.put('/update_discount/:Id', discoutController.updateDiscount);
router.delete('/delete_discount/:Id', discoutController.deleteDiscount);

module.exports = router;