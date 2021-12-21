const firebase = require('../db');
const Product = require('../models/product');
const firestore = firebase.firestore();

exports.getAllProduct = async(req,res,next)=>{
    try {
        const product = await firestore.collection('product');
        const data = await product.get();
        const productArray = [];
        if(data.empty){
            res.status(404).send({message:"No product found"});
        }else{
            data.forEach(doc =>{
                const product = new Product(
                    doc.id,
                    doc.data().name,
                    doc.data().image,
                    doc.data().description,
                    doc.data().price,
                    doc.data().category_id
                );
                productArray.push(product);
            });
            res.send({message:'roles fetch Successfully',status:'success',data: productArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting users',status:'fail'});
    }
}

exports.addNewProduct = async(req,res,next)=>{
    try {
        const data = req.body;
        const product = await firestore.collection('product').doc().set(data);
        res.send({message:'Product Add Successfully',status:'success',data:product});
    } catch (error) {
        console.log(error);
        res.send({message:'error in inserting product',status:'fail'});
    }
}