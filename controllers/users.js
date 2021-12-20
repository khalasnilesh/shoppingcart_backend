const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

exports.register = async (req,res,next) =>{
    try {
        const data = req.body;
        const user = await firestore.collection('users').doc().set(data);
        res.send({message:'Register Successfully',status:'success',data:user});
    } catch (error) {
        console.log(error);
        res.send({message:'error in register',status:'fail'});
    }
}

exports.login = async(req,res,next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await firestore.collection('users').doc(email,password);
        const data = await user.get();
        if(data.empty){
            res.send({message:'no user found',status:'success'})
        }
        else{
            res.send({message:'login Successfully',status:'success'});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error in login',status:'fail'});
    }
}

exports.forgotpassword = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const email = req.query.email;
        const Password = req.body.password;
        const userDetails = await firestore.collection('users').where('email','=',email).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                doc.ref.update({password: Password})
            });
       })
        // console.log(userDetails);
        // await userDetails.update({ 'password' : Password});
            res.send({message:'password updated successfully',status :'success'})
    }catch(error){
        console.log(error);
        res.send({message:'error in updating passowrd',status:'fail'});
    }
}