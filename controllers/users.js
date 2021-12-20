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
        res.send({message:'error in updating password',status:'fail'});
    }
}

exports.addUser = async(req,res,next)=>{
    try {
        const data = req.body;
        const user = await firestore.collection('users').doc().set(data);
        res.send({message:'Register Successfully',status:'success',data:user});
    } catch (error) {
        console.log(error);
        res.send({message:'error in register',status:'fail'});
    }
}

exports.getAllUsers = async(req,res,next)=>{
    try {
        const user = await firestore.collection('users');
        const data = await user.get();
        const usersArray = [];
        if(data.empty){
            res.status(404).send({message:"No user found"});
        }else{
            data.forEach(doc =>{
                const user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().email,
                    doc.data().password,
                    doc.data().phone,
                    doc.data().role_id,
                    doc.data().city_id,
                    doc.data().state_id,
                    doc.data().country_id
                );
                usersArray.push(user);
            });
            res.send({message:'users fetch Successfully',status:'success',data:usersArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting users',status:'fail'});
    }
}

exports.updateuser = async(req,res,next) =>{
    try{
        const id = req.params.Id;
        const data = req.body;
        const user = await firestore.collection('users').doc(id);
        await user.update(data);
        res.send({message:'user update successfully', status: 'success'});
    }
    catch(error){
        console.log(error);
        res.send({message:'error in updating passowrd',status:'fail'});
    }
}

exports.getUserByID = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        const usersArray = [];
        if(data.empty){
            res.status(404).send({message:"No user found"});
        }else{           
            res.send({message:'user fetch Successfully',status:'success',data: data.data()});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('users').doc(id).delete();
        res.send({message:'user deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
    }
}

exports.userLogout = async(req,res,next)=>{
    try {
        console.log("hello");
        req.session.destroy(function (err) {
            res.send({message:"Successfully Logout! ",status:'success'})
        })
    } catch (error) {
        console.log(error);
    }
}