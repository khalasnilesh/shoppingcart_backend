const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', categoryController.getAllCategories);
router.post('/addcategory', categoryController.addCategory);
router.put('/updatecategory/:Id' , categoryController.updateCategory);
router.get('/:Id', categoryController.getCategoryById);
router.delete('/delete/:Id', categoryController.deleteCategoryById);


module.exports = router;