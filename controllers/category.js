const firebase = require('../db');
const Category = require('../models/category');
const firestore = firebase.firestore();

exports.getAllCategories = async(req,res,next)=>{
    try {
        const category = await firestore.collection('category');
        const data = await category.get();
        const categoryArray = [];
        if(data.empty){
            res.status(404).send({message:"No role found"});
        }else{
            data.forEach(doc =>{
                const category = new Category(
                    doc.id,
                    doc.data().name,
                );
                categoryArray.push(category);
            });
            res.send({message:'category fetch Successfully',status:'success',data: categoryArray});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting users',status:'fail'});
    }
}

exports.addCategory = async(req,res,next)=>{
    try {
        const data = req.body;
        const category = await firestore.collection('category').doc().set(data);
        res.send({message:'Role Add Successfully',status:'success'});
    } catch (error) {
        console.log(error);
        res.send({message:'error in inserting category',status:'fail'});
    }
}

exports.updateCategory = async(req,res,next)=>{
    try{
        const id = req.params.Id;
        const data = req.body;
        const category = await firestore.collection('category').doc(id);
        await category.update(data);
        res.send({message:'category update successfully', status: 'success'});
    }
    catch(error){
        console.log(error);
        res.send({message:'error in updating category',status:'fail'});
    }
}

exports.getCategoryById = async(req,res,next)=>{
    try {
        const id = req.params.Id;
        const category = await firestore.collection('category').doc(id);
        const data = await category.get();
        if(data.empty){
            res.status(404).send({message:"No category found"});
        }else{           
            res.send({message:'category fetch Successfully',status:'success',data: data.data()});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCategoryById = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('category').doc(id).delete();
        res.send({message:'category deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
    }
}