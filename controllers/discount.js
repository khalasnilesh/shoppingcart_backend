const firebase = require('../db');
const Discount = require('../models/discount');
const firestore = firebase.firestore();

exports.getAllDiscount = async(req,res,next)=>{
    try {
        const discount = await firestore.collection('discount');
        const data = await discount.get();
        const discountArray = [];
        if(data.empty){
            res.status(404).send({message:"No discount found"});
        }else{
            data.forEach(doc =>{
                const discount = new Discount(
                    doc.id,
                    doc.data().promo,
                    doc.data().disc_perc,
                    doc.data().product_id,
                );
                discountArray.push(discount);
            });
            res.send({message:'discount fetch Successfully',status:'success',data: discountArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting discount',status:'fail'});
    }
}

exports.addDiscount = async(req,res,next)=>{
    try {
        const data = req.body;
        const discount = await firestore.collection('discount').doc().set(data);
        res.send({message:'Discount Add Successfully',status:'success',data:discount});
    } catch (error) {
        console.log(error);
        res.send({message:'error in inserting discount',status:'fail'});
    }
}

exports.getDiscountById = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const discount = await firestore.collection('discount').doc(id);
        const data = await discount.get();
        if(data.empty){
            res.status(404).send({message:"No discount found",status: 'success'});
        }else{           
            res.send({message:'discount fetch Successfully',status:'success',data: data.data()});
        }
    } catch (error) {
        console.log(error);
        res.send({message:"error in discount fetch", status: 'fail'});
    }
}

exports.updateDiscount = async(req,res,next)=>{
    try{
        const id = req.params.Id;
        const promo = req.body.promo;
        const disc_perc = req.body.disc_percentage;
        const product_id = req.body.product_id;
        const discount = await firestore.collection('discount').doc(id);
        await discount.update({'promo' : promo , 'disc_perc' : disc_perc , 'product_id' : product_id});
        res.send({message:'discount update successfully', status: 'success'});
    }
    catch(error){
        console.log(error);
        res.send({message:'error in updating discount',status:'fail'});
    }
}

exports.deleteDiscount = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('discount').doc(id).delete();
        res.send({message:'discount deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
        res.send({message:"error in discount deleting", status: 'fail'});
    }
}