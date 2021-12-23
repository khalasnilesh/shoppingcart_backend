const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const multer = require('multer');
//const upload = multer({dest : 'uploads/'});


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null ,Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === ' image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    } else{
        cb(null,false);
    }
    
};

const upload = multer({
    storage : storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
});

router.get('/', productController.getAllProduct);
router.post('/addproduct',upload.single('image'), productController.addNewProduct);
router.put('/updateproduct/:Id',upload.single('image'), productController.updateProduct);
router.get('/:Id', productController.getProductById);
router.delete('/deleteproduct/:Id', productController.deleteProductById);
router.get('/showon/home', productController.getProductShowOn);

module.exports = router;