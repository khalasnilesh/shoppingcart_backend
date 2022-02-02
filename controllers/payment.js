const firebase = require('../db');
const firestore = firebase.firestore();

// require('dotenv').config();
// const PaytmChecksum = require('../PaytmChecksum');
// const {v4:uuidv4}=require('uuid');
// const { param } = require('../routes/payment');

// exports.addPayment = async(req,res,next) =>{
    
// const {amount,email} = req.body;

//             /* import checksum generation utility */

//         const totalAmount = JSON.stringify(amount);
//         var paytmParams = {};

//         /* initialize an array */
//         paytmParams['MID'] = process.env.PAYTM_MID,
//         paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
//         paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNELIDWEB,
//         paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRYTYPE,
//         paytmParams['ORDER_ID'] = uuidv4(),
//         paytmParams['TXN_AMOUNT'] = totalAmount,
//         paytmParams['CALLBACK_URL'] = 'http://localhost:3030/api/callback',
//         paytmParams['EMAIl'] = email,
//         paytmParams['MOBILE_No'] = '9876543210'
        

//         /**
//         * Generate checksum by parameters we have
//         * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
//         */
//         var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MKEY);
//         paytmChecksum.then(function(checksum){
//             var final = paytmParams,checksum;
//             res.send({message:'Successfully Payment',status:'success',data: paytmParams,checksum});
//             console.log("generateSignature Returns: " + checksum);
//         }).catch(function(error){
//             res.send({message:'Error in making payment',status:'fail', data:error})
//             console.log(error);
//         });
// }

exports.makePayment = async(req,res,next)=>{
    try{
        const data = req.body;
        const payment = await firestore.collection('payment').doc().set(data);
        res.send({message:'Payment Successfully',status:'success',data: data});
    }
    catch(error){
        console.log(error);
        res.send({message:'error in payment',status:'fail'});
    }
}