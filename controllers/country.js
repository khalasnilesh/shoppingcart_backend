const firebase = require("../db");
const firestore = firebase.firestore();
const City = require("../models/city");
const State = require("../models/state");
const Country = require("../models/country");

exports.country = async (req,res,next) =>{
    try{
        const country = await firestore.collection('country');
        const data = await country.get();
        const countryArray = [];
        if(data.empty){
            res.status(404).send({message:"No country found"});
        }else{
            data.forEach(doc =>{
                const country = new Country(
                    doc.id,
                    doc.data().name
                );
                countryArray.push(country);
            });
            res.send({message:'country fetch Successfully',status:'success',data:countryArray});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }
}

exports.state = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const state = await firestore.collection('states').doc(id);
        const data = await state.get();
        if(data.empty){
            res.status(404).send({message:"No state found"});
        }else{
            res.send({message:'state fetch Successfully',status:'success',data: data.data()});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }
}

exports.city = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const state = await firestore.collection('city').doc(id);
        const data = await state.get();
        if(data.empty){
            res.status(404).send({message:"No city found"});
        }else{
            res.send({message:'city fetch Successfully',status:'success',data: data.data()});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }
}

