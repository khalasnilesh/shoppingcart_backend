const firebase = require("../db");
const firestore = firebase.firestore();
const City = require("../models/city");
const State = require("../models/state");
const Country = require("../models/country");

// exports.country = async (req,res,next) =>{
//     try{
//         const country = await firestore.collection('country');
//         const data = await country.get();
//         const userArray = [];
//         if(data.empty){
//             res.send(404).send({message:"No country found"});
//         }else{
//             data.forEach(doc =>{
//                 const country = new Country(
//                     doc.id,
//                     doc.data().name
//                 );
//                 userArray.push(country);
//             });
//             res.send({message:'country fetch Successfully',status:'success',data:userArray});
//         }
//     }catch(error){
//         console.log(error);
//         res.send({message:'error',status:'fail',message:error});
//     }
// }

exports.country = async(req,res,mext)=>{
    console.log("hello");
}