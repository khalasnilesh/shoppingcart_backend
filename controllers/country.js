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

exports.getstateById = async (req,res,next) =>{
    try{
        const country_id = req.params.countryId;
        console.log(country_id);
        const stateDetails = await firestore.collection('states').where('country_id','=',country_id).get();
        console.log(stateDetails)
        //const data = await state.get();
        const stateArray = [];
        if(stateDetails.empty){
            res.status(404).send({message:"No country found"});
        }else{
            stateDetails.forEach(doc =>{
                const state = new State(
                    doc.id,
                    doc.data().name,
                    doc.data().country_id
                );
                stateArray.push(state);
            });
            console.log(stateArray);
            res.send({message:'state fetch Successfully',status:'success',data:stateArray});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }

}

exports.getcityById = async (req,res,next) =>{
    try{
        const state_id = req.query.state_id;
        const country_id = req.query.country_id;
        console.log(country_id);
        const cityDetails = await firestore.collection('city').where('state_id','==',state_id).where('country_id','==',country_id).get();
        //const data = await state.get();
        const cityArray = [];
        if(cityDetails.empty){
            res.status(404).send({message:"No city found"});
        }else{
            cityDetails.forEach(doc =>{
                const city = new City(
                    doc.id,
                    doc.data().name,
                    doc.data().state_id,
                    doc.data().country_id
                );
                cityArray.push(city);
            });
            console.log(cityArray);
            res.send({message:'cities fetch Successfully',status:'success',data:cityArray});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }

}

