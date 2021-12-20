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
        const country_id = req.query.country_id;
        const state = await firestore.collection('states').where('country_id','=',country_id).get();
        //const data = await state.get();
        const stateArray = [];
        if(state.empty){
            res.status(404).send({message:"No country found"});
        }else{
            // data.forEach(doc =>{
            //     const state = new State(
            //         doc.id,
            //         doc.data().name,
            //         doc.data().country_id
            //     );
            //     stateArray.push(state);
            // });
            console.log(state);
            for(i = 0; i< state.length ; i++){
                const state = new State(
                            i.id,
                            i.data().name,
                            i.data().country_id
                        );
                        stateArray.push(state);
            }
            console.log(stateArray);
            res.send({message:'state fetch Successfully',status:'success',data:stateArray});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }
}

exports.city = async (req,res,next) =>{
    try{
        const country_id = req.query.country_id;
        const state_id = req.query.state_id;
        const state = await firestore.collection('city').doc();
        const data = await state.get();
        if(data.empty){
            res.status(404).send({message:"No city found"});
        }else{
            console.log(data.data());
            res.send({message:'city fetch Successfully',status:'success', data:(data.data())});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error',status:'fail',message:error});
    }
}

