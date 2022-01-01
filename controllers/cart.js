const firebase = require('../db');
const Cart = require('../models/cart');
const firestore = firebase.firestore();

exports.getAllcart = async(req,res,next)=>{
    try {
        let product = {};
        let user = {};
        let discount = {};
        await firestore.collection('users').get().then((result)=>{
            result.forEach((doc)=>{
                user[doc.id] = doc.data();
            })
        })
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        await firestore.collection('discount').get().then((result)=>{
            result.forEach((doc)=>{
                discount[doc.id] = doc.data();
            })
        })
        const cart = await firestore.collection('cart');
        const data = await cart.get();
        
        const cartArray = [];
        if(data.empty){
            res.status(404).send({message:"No cart found"});
        }else{
            data.forEach(doc =>{
                let discount_percentage = {};
                let discount_price = {};
                let final_total = {};
                let discountpercArray = [];
                let discountpriceArray = [];
                let totalArray = [];
                if(doc.data().discount_id === ""){
                    discount_percentage = "";
                    discount_price = "";
                    final_total = doc.data().qty * product[doc.data().product_id].price
                }else{
                    discount_percentage = discount[doc.data().discount_id].disc_perc;
                    discount_price = (doc.data().qty * product[doc.data().product_id].price/100)* discount[doc.data().discount_id].disc_perc
                    final_total = (doc.data().qty * product[doc.data().product_id].price) - ((doc.data().qty * product[doc.data().product_id].price/100)* discount[doc.data().discount_id].disc_perc)
                }
                discountpercArray.push(discount_percentage);
                const finaldiscountperc = Number(discountpercArray);
                discountpriceArray.push(discount_price);
                const finaldiscountprice = Number(discountpriceArray);
                totalArray.push(final_total);
                const total = Number(totalArray);
                //const date = doc.data().created_at;
                let date_ob = new Date(doc.data().created_at);

                // current date
                // adjust 0 before single digit date
                let date = ("0" + date_ob.getDate()).slice(-2);

                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                // current year
                let year = date_ob.getFullYear();

                // current hours
                let hours = date_ob.getHours();

                // current minutes
                let minutes = date_ob.getMinutes();

                // current seconds
                let seconds = date_ob.getSeconds();

                // prints date in YYYY-MM-DD format
                let final_date = (year + "-" + month + "-" + date);
                console.log(final_date);
                const cart = new Cart(
                    doc.id,
                    doc.data().user_id,
                    user[doc.data().user_id].name,
                    doc.data().product_id,
                    doc.data().qty,
                    doc.data().created_at,
                    product[doc.data().product_id].name,
                    product[doc.data().product_id].description,
                    product[doc.data().product_id].image,
                    product[doc.data().product_id].price,
                    doc.data().discount_id, 
                    finaldiscountperc,
                    finaldiscountprice,
                    total,
                    
                );
                cartArray.push(cart);
            });
            res.send({message:'carts fetch Successfully',status:'success',data:cartArray});
        }
              
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting cart',status:'fail'});
    }
}

exports.addtocart = async(req,res,next)=>{
    try {
        const user_id = req.body.user_id;
        const product_id = req.body.product_id;
        const qty = req.body.quantity;
        const datetime = new Date();
        const cart = await firestore.collection('cart').doc().set({'user_id':user_id,'product_id':product_id , 'qty' : Number(qty) , 'promo' : '', 'discount_id' : '' , 'created_at' : datetime });
        res.send({message:'cart Add Successfully',status:'success',data:cart});
    } catch (error) {
        console.log(error);
        res.send({message:'error in adding cart',status:'fail',data : error});
    }
}

exports.getcartById = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        let product = {};
        let user = {};
        let discount = {};
        await firestore.collection('discount').get().then((result)=>{
            result.forEach((doc)=>{
                discount[doc.id] = doc.data();
            })
        })
        await firestore.collection('users').get().then((result)=>{
            result.forEach((doc)=>{
                user[doc.id] = doc.data();
            })
        })
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        const cart = await firestore.collection('cart').doc(id)
        const data = await cart.get();
        console.log(data.data().promo);
        if(data.empty){
            res.status(404).send({message:"No cart found"});
        }else{
            if(data.data().promo === ""){
                const cartDetail = {
                    id : data.id,
                    user_id : data.data().user_id,
                    user_name : user[data.data().user_id].name,
                    qty : data.data().qty,
                    product_id : data.data().product_id,
                    product_name : product[data.data().product_id].name,
                    product_description : product[data.data().product_id].description,
                    product_image : product[data.data().product_id].image,
                    product_price : product[data.data().product_id].price,
                    price : data.data().qty * product[data.data().product_id].price,
                    promo : "",
                    discount_id : "",
                    discount_percentage : "",
                    discount_price : "",
                    total : data.data().qty * product[data.data().product_id].price
                }
               res.send({message:'cart fetch Successfully',status:'success',data: cartDetail});
            }else{
                const cartDetail = {
                    id : data.id,
                    user_id : data.data().user_id,
                    user_name : user[data.data().user_id].name,
                    qty : data.data().qty,
                    product_id : data.data().product_id,
                    product_name : product[data.data().product_id].name,
                    product_description : product[data.data().product_id].description,
                    product_image : product[data.data().product_id].image,
                    product_price : product[data.data().product_id].price,
                    price : data.data().qty * product[data.data().product_id].price,
                    promo : data.data().promo,
                    discount_id : data.data().discount_id,
                    discount_percentage : discount[data.data().discount_id].disc_perc,
                    discount_price : (data.data().qty * product[data.data().product_id].price/100)* discount[data.data().discount_id].disc_perc,
                    total : (data.data().qty * product[data.data().product_id].price) - ((data.data().qty * product[data.data().product_id].price/100)* discount[data.data().discount_id].disc_perc)
                }
                res.send({message:'cart fetch Successfully',status:'success',data: cartDetail});
            }                
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

exports.getcartByUserId = async(req,res,next)=>{
    try {
        const user_id = req.params.userId;
        let product = {};
        let user = {};
        let discount = {};
        await firestore.collection('discount').get().then((result)=>{
            result.forEach((doc)=>{
                discount[doc.id] = doc.data();
            })
        })
        await firestore.collection('users').get().then((result)=>{
            result.forEach((doc)=>{
                user[doc.id] = doc.data();
            })
        })
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        const cart = await firestore.collection('cart').where('user_id','==',user_id)
        const data = await cart.get();
        const cartArray = [];
        if(data.empty){
            res.status(404).send({message:"No cart found"});
        }else{
            data.forEach(doc =>{
                let discount_percentage = {};
                let discount_price = {};
                let final_total = {};
                let discountpercArray = [];
                let discountpriceArray = [];
                let totalArray = [];
                if(doc.data().discount_id === ""){
                    discount_percentage = "";
                    discount_price = "";
                    final_total = doc.data().qty * product[doc.data().product_id].price
                }else{
                    discount_percentage = discount[doc.data().discount_id].disc_perc;
                    discount_price = (doc.data().qty * product[doc.data().product_id].price/100)* discount[doc.data().discount_id].disc_perc
                    final_total = (doc.data().qty * product[doc.data().product_id].price) - ((doc.data().qty * product[doc.data().product_id].price/100)* discount[doc.data().discount_id].disc_perc)
                }
                discountpercArray.push(discount_percentage);
                const finaldiscountperc = Number(discountpercArray);
                discountpriceArray.push(discount_price);
                const finaldiscountprice = Number(discountpriceArray);
                totalArray.push(final_total);
                const total = Number(totalArray);
                //const date = doc.data().created_at;
                let date_ob = new Date(doc.data().created_at);

                // current date
                // adjust 0 before single digit date
                let date = ("0" + date_ob.getDate()).slice(-2);

                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                // current year
                let year = date_ob.getFullYear();

                // current hours
                let hours = date_ob.getHours();

                // current minutes
                let minutes = date_ob.getMinutes();

                // current seconds
                let seconds = date_ob.getSeconds();

                // prints date in YYYY-MM-DD format
                let final_date = (year + "-" + month + "-" + date);
                console.log(final_date);
                const cart = new Cart(
                    doc.id,
                    doc.data().user_id,
                    user[doc.data().user_id].name,
                    doc.data().product_id,
                    doc.data().qty,
                    doc.data().created_at,
                    product[doc.data().product_id].name,
                    product[doc.data().product_id].description,
                    product[doc.data().product_id].image,
                    product[doc.data().product_id].price,
                    doc.data().discount_id, 
                    finaldiscountperc,
                    finaldiscountprice,
                    total,
                    
                );
                cartArray.push(cart);
            });
            res.send({message:'carts fetch Successfully',status:'success',data:cartArray});              
        }                   
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting cart',status:'fail'});
    }
}

exports.getDiscountOnPrice = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const promo = req.body.promo;
        let user = {};
        await firestore.collection('users').get().then((result)=>{
            result.forEach((doc)=>{
                user[doc.id] = doc.data();
            })
        })
        let product = {};
        await firestore.collection('product').get().then((result)=>{
            result.forEach((doc)=>{
                product[doc.id] = doc.data();
            })
        })
        let discount = {};
        let discountArray = [];
        let add = {};
        await firestore.collection('discount').where('promo','==',promo).get().then((result)=>{
            result.forEach((doc)=>{
                discount[doc.id] = doc.data();
                add = doc.id;
            })
        })
        discountArray.push(add);
        const finaldiscount = String(discountArray);
        console.log(finaldiscount);
        const cart = await firestore.collection('cart').doc(id)
        await cart.update({'promo' : promo , 'discount_id' : finaldiscount});
        const data = await cart.get();
        const cartDetail = {
            id : data.id,
            user_id : data.data().user_id,
            user_name : user[data.data().user_id].name,
            qty : data.data().qty,
            created_at : data.data().created_at,
            product_id : data.data().product_id,
            product_name : product[data.data().product_id].name,
            product_description : product[data.data().product_id].description,
            product_image : product[data.data().product_id].image,
            product_price : product[data.data().product_id].price,
            price : data.data().qty * product[data.data().product_id].price,
            promo : data.data().promo,
            discount_id : data.data().discount_id,
            discount_percentage : discount[data.data().discount_id].disc_perc,
            discount_price : (data.data().qty * product[data.data().product_id].price/100)* discount[data.data().discount_id].disc_perc,
            total : (data.data().qty * product[data.data().product_id].price) - ((data.data().qty * product[data.data().product_id].price/100)* discount[data.data().discount_id].disc_perc)
        }
            res.send({message:'discount add in cart Successfully',status:'success', data : cartDetail});
    } catch (error) {
        console.log(error);
        res.send({message:'error in adding discount in cart',status:'fail'});
    }
}