const firebase = require('../db');
const Discount = require('../models/discount');
const firestore = firebase.firestore();

exports.getAllDiscount = async(req,res,next)=>{
    console.log("hello");
}

exports.addDiscount = async(req,res,next)=>{
    try {
        console.log("insert");
    } catch (error) {
        console.log(error);
        res.send({message:'error in inserting discount',status:'fail'});
    }
}