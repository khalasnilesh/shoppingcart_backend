const { file } = require('googleapis/build/src/apis/file');
const firebase = require('../db');
const Product = require('../models/product');
const firestore = firebase.firestore();
firestore.settings({ignoreUndefinedProperties : true});
const {uploadFile, getFileStream} = require('../s3');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.getAllProduct = async(req,res,next)=>{
    try {
        let finalData = [];
        let category = {};
        let productdata = {};
        
        await firestore.collection('category').get().then((result)=>{
            result.forEach((doc)=>{
                category[doc.id] = doc.data();
            })
        })
        let finalProduct = [];
        product = await firestore.collection('product')
        product.get().then((docSnaps)=>{
            docSnaps.forEach((doc)=>{
                productdata[doc.id] = doc.data();
                productdata[doc.id].categoryName = category[doc.data().category_id].name;
                console.log(category[doc.data().category_id].name)
                finalProduct = productdata[doc.id];
                finalData.push({id: doc.id,...finalProduct});
            })
            res.send({message:'product fetch Successfully',status:'success',data: finalData});
        })
        
           
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting products',status:'fail'});
    }
}

exports.getProductKey = function(req,res,next) {
    const key = req.params.key;
    const readStream = getFileStream(key)

    readStream.pipe(res);
}

exports.addNewProduct = async(req,res,next)=>{
    try {
        console.log(req.file);
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const category_id = req.body.category_id;
        const image = req.file;
        const show_on = req.body.show_on;
        const result = await uploadFile(image);
        console.log(result);
        const product = await firestore.collection('product').doc().set({'name':name , 'price' : price , 'description' : description , 'category_id' : category_id , 'image' : result.Location , 'show_on': show_on});
        res.send({message:'Product Add Successfully',status:'success',data:product});
    } catch (error) {
        console.log(error);
        res.send({message:'error in inserting product',status:'fail',data : error});
    }
}

exports.updateProduct = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        console.log(req.file);        
            const name = req.body.name;
            const price = req.body.price;
            const description = req.body.description;
            const category_id = req.body.category_id;
            const image = req.file;
            const show_on = req.body.show_on;
            const result = await uploadFile(image);
            console.log(result);
        const product = await firestore.collection('product').doc(id)
        await product.update({'name': name, 'price' : price , 'description' : description , 'category_id' : category_id , 'image' : result.Location , 'show_on': show_on});
        res.send({message:'Product updated Successfully',status:'success'});
    } catch (error) {
        console.log(error);
        res.send({message:'error in updating product' , status : 'fail'});
    }
}

exports.getProductById = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const product = await firestore.collection('product').doc(id);
        const data = await product.get();
        if(data.empty){
            res.status(404).send({message:"No product found",status: 'success'});
        }else{           
            res.send({message:'product fetch Successfully',status:'success',data: data.data()});
        }
    } catch (error) {
        console.log(error);
        res.send({message:"error in product fetch", status: 'fail'});
    }
}

exports.deleteProductById = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('product').doc(id).delete();
        res.send({message:'product deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
        res.send({message:"error in product delete", status: 'fail'});
    }
}

exports.getProductShowOn = async(req,res,next)=>{
    try {
        const product = await firestore.collection('product').where('show_on','==','1');
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
                    doc.data().category_id,
                    doc.data().show_on,
                );
                productArray.push(product);
            });
            res.send({message:'product fetch Successfully',status:'success',data: productArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting products',status:'fail'});
    }
}