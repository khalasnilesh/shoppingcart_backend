const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', productController.getAllProduct);
router.post('/addproduct', productController.addNewProduct);

module.exports = router;