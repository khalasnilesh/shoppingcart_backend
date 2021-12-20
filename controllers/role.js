const firebase = require('../db');
const Role = require('../models/role');
const firestore = firebase.firestore();

exports.getAllRoles = async(req,res,next)=>{
    try {
        const role = await firestore.collection('role');
        const data = await role.get();
        const rolesArray = [];
        if(data.empty){
            res.status(404).send({message:"No role found"});
        }else{
            data.forEach(doc =>{
                const role = new Role(
                    doc.id,
                    doc.data().name,
                    doc.data().access_by,
                );
                rolesArray.push(role);
            });
            res.send({message:'roles fetch Successfully',status:'success',data: rolesArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting users',status:'fail'});
    }
}

exports.addRole = async(req,res,next)=>{
    try {
        const data = req.body;
        const role = await firestore.collection('role').doc().set(data);
        res.send({message:'Role Add Successfully',status:'success',data:role});
    } catch (error) {
        console.log(error);
        res.send({message:'error in register',status:'fail'});
    }
}

exports.updateRole = async(req,res,next)=>{
    try{
        const id = req.params.Id;
        const data = req.body;
        const role = await firestore.collection('role').doc(id);
        await role.update(data);
        res.send({message:'role update successfully', status: 'success'});
    }
    catch(error){
        console.log(error);
        res.send({message:'error in updating passowrd',status:'fail'});
    }
}

exports.getRoleById = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const role = await firestore.collection('role').doc(id);
        const data = await role.get();
        if(data.empty){
            res.status(404).send({message:"No role found"});
        }else{           
            res.send({message:'role fetch Successfully',status:'success',data: data.data()});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteRoleById = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('role').doc(id).delete();
        res.send({message:'role deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
    }
}