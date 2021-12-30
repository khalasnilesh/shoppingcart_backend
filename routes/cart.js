const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', cartController.getAllcart);
router.post('/addtocart', cartController.addtocart);
router.get('/:Id', cartController.getcartById);
router.put('/update/:Id',cartController.updateAddtoCart);
router.delete('/delete/:Id',cartController.deleteCart);
router.get('/:Id', cartController.getcartById);
router.get('/user/:userId', cartController.getcartByUserId);
router.post('/:Id/getdiscount', cartController.getDiscountOnPrice);

module.exports = router;