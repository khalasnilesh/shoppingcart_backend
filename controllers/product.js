const firebase = require('../db');
const Product = require('../models/product');
const firestore = firebase.firestore();
firestore.settings({ignoreUndefinedProperties : true})


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
                    doc.data().category_id,
                    doc.data().show_on,
                );
                productArray.push(product);
            });
            res.send({message:'products fetch Successfully',status:'success',data: productArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting products',status:'fail'});
    }
}

exports.addNewProduct = async(req,res,next)=>{
    try {
        console.log(req.file.path);
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const category_id = req.body.category_id;
        const image = req.file.path;
        const show_on = req.body.show_on;
        const product = await firestore.collection('product').doc().set({'name':name , 'price' : price , 'description' : description , 'category_id' : category_id , 'image' : image , 'show_on': show_on});
        res.send({message:'Product Add Successfully',status:'success',data:product});
    } catch (error) {
        console.log(error);
        res.send({message:'error in inserting product',status:'fail'});
    }
}

exports.updateProduct = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        console.log(req.file);
        const data = {
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            category_id : req.body.category_id,
            image : req.file.path,
            show_on : req.body.show_on,
        }        
        const product = await firestore.collection('product').doc(id)
        await product.update(data);
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
            res.status(404).send({message:"No product found",status: 'fail'});
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