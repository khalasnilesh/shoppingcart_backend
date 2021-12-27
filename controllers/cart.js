const firebase = require('../db');
const Cart = require('../models/cart');
const firestore = firebase.firestore();

exports.getAllcart = async(req,res,next)=>{
    try {
        let finalData = [];
        let product = {};
        let cartdata = {};
        
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        let finalProduct = [];
        cart = await firestore.collection('cart')
        cart.get().then((docSnaps)=>{
            docSnaps.forEach((doc)=>{
                cartdata[doc.id] = doc.data();
                cartdata[doc.id].productName = product[doc.data().product_id].name;
                cartdata[doc.id].productDescription = product[doc.data().product_id].description;
                cartdata[doc.id].productImage = product[doc.data().product_id].image;
                console.log(product[doc.data().product_id].name)
                finalProduct = cartdata[doc.id];
                finalData.push({id: doc.id,...finalProduct});
            })
            res.send({message:'cart fetch Successfully',status:'success',data: finalData});
        })
        
           
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting cart',status:'fail'});
    }
}

exports.addtocart = async(req,res,next)=>{
    try {
        const product_id = req.body.product_id;
        const price = req.body.price;
        const qty = req.body.quantity;
        const cart = await firestore.collection('cart').doc().set({'product_id':product_id , 'price' : Number(price) , 'qty' : Number(qty)});
        res.send({message:'cart Add Successfully',status:'success',data:cart});
    } catch (error) {
        console.log(error);
        res.send({message:'error in adding cart',status:'fail',data : error});
    }
}

exports.getcartById = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const cart = await firestore.collection('cart').doc(id);
        const data = await cart.get();
        if(data.empty){
            res.status(404).send({message:"No cart found",status: 'success'});
        }else{           
            res.send({message:'cart fetch Successfully',status:'success',data: data.data()});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting cart',status:'fail'});
    }
}

exports.updateAddtoCart = async(req,res,next)=>{
    try{
        const id = req.params.Id;
        const qty = req.body.quantity;
        const cart = await firestore.collection('cart').doc(id);
        await cart.update({'qty' : Number(qty)});
        res.send({message:'cart update successfully', status: 'success'});
    }
    catch(error){
        console.log(error);
        res.send({message:'error in updating cart',status:'fail'});
    }
}

exports.deleteCart = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('cart').doc(id).delete();
        res.send({message:'cart deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
        res.send({message:'error in deleting cart',status:'fail'});
    }
}