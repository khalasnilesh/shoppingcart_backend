const { datastore } = require('googleapis/build/src/apis/datastore');
const firebase = require('../db');
const Discount = require('../models/discount');
const firestore = firebase.firestore();

exports.getAllDiscount = async(req,res,next)=>{
    try {
        let product = {};
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        const discount = await firestore.collection('discount')
        const data = await discount.get();
        const discountArray = [];
        if(data.empty){
            res.status(404).send({message:"No discount found",status : 'success'});
        }else{
            data.forEach(doc =>{
                const discount = new Discount(
                    doc.id,
                    doc.data().promo,
                    doc.data().disc_perc,
                    doc.data().product_id,
                    product[doc.data().product_id].name,
                );
                discountArray.push(discount);
            });
            res.send({message:'disocunt fetch Successfully',status:'success',data:discountArray});
        }
                
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting discount',status:'fail'});
    }
}

exports.getAllDiscountWithProductName = async(req,res,next)=>{
    try {
        let finalData = [];
        let product = {};
        let promocode = {};
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        let finalProduct = [];
        discount = await firestore.collection('discount')
        discount.get().then((docSnaps)=>{
            docSnaps.forEach((doc)=>{
                promocode[doc.id] = doc.id;
                promocode[doc.id] = doc.data();
                promocode[doc.id].productName = product[doc.data().product_id].name;
                finalProduct = promocode[doc.id];
                finalData.push({id: doc.id,...finalProduct});
            });
            console.log(finalData);

            res.send({message:'discount fetch Successfully',status:'success',data: finalData});
        });
                
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
        let id = req.params.Id;
        let finalData = [];
        let product = {};
        let promocode = {};
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        let finalProduct = [];
        discount = await firestore.collection('discount').doc(id)
        discount.get().then((doc)=>{
                promocode[doc.id] = doc.id;
                promocode[doc.id] = doc.data();
                promocode[doc.id].productName = product[doc.data().product_id].name;
                finalProduct = promocode[doc.id];
                finalData.push({id: doc.id,...finalProduct});
            console.log(finalData);

            res.send({message:'discount fetch Successfully',status:'success',data: finalData[0]});
        });
                
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting discount',status:'fail'});
    }
}

exports.updateDiscount = async(req,res,next)=>{
    try{
        const id = req.params.Id;
        const promo = req.body.promo;
        const disc_perc = req.body.disc_perc;
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

exports.getDiscountByProductId = async(req,res,next)=>{
    try {
        let product_id = req.params.productId;
        let product = {};
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        const discount = await firestore.collection('discount').where('product_id','==',product_id)
        const data = await discount.get();
        const discountArray = [];
        if(data.empty){
            res.status(404).send({message:"No discount found on this product",status : 'success'});
        }else{
            data.forEach(doc =>{
                const discount = new Discount(
                    doc.id,
                    doc.data().promo,
                    doc.data().disc_perc,
                    doc.data().product_id,
                    product[doc.data().product_id].name,
                    doc.data().user_id
                );
                discountArray.push(discount);
            });
            res.send({message:'disocunt fetch Successfully',status:'success',data:discountArray});
        }
                
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting discount',status:'fail'});
    }
}