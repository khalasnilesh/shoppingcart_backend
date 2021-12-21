const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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
        const user = await firestore.collection('users').where('email','=',email).where('password','=',password).get();
        console.log(user);
        const usersArray = [];
        if(user.empty){
            res.send({message:'no user found',status:'fail'});
        }
        else{
            var token = jwt.sign({email,password},'secret');
            user['token'] = token;
            user.forEach(doc =>{
                const user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().email,
                    doc.data().phone,
                    doc.data().role_id,
                    doc.data().city_id,
                    doc.data().state_id,
                    doc.data().country_id
                );
                usersArray.push(user);
            });
            res.send({message:'login Successfully',status:'success', data : usersArray[0] , token : token});
        }
    }catch(error){
        console.log(error);
        res.send({message:'error in login',status:'fail'});
    }
}


// exports.forgotpassword = async(req,res,next)=>{
//     try{
//         const id = req.params.id;
//         const email = req.query.email;
//        // const Password = req.body.password;
//        async function main() {
//         // Generate test SMTP service account from ethereal.email
//         // Only needed if you don't have a real mail account for testing
//         let testAccount = await nodemailer.createTestAccount();
      
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//           host: "smtp.gmail.com",
//           port: 587,
//           secure: false, // true for 465, false for other ports
//           auth: {
//             user: "gargipatel612@gmail.com", // generated ethereal user
//             pass: "gargi@612" // generated ethereal password
//           }
//         });
      
//         // send mail with defined transport object
//         let info = await transporter.sendMail({
//           from: '"gargi patel"', // sender address
//           to: "shreyapatel6121997@gmail.com", // list of receivers
//           subject: "about details", // Subject line
//           html: "name: "+to1, "Contact: ":+contact,"course: ":+course 
          
//           // html body
//         });
      
//         console.log("Message sent: %s", info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
//         // Preview only available when sending through an Ethereal account
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//       }
       
//         res.send({message:'mail send successfully',status :'success'})
//     }catch(error){
//         console.log(error);
//         res.send({message:'error in updating password',status:'fail'});
//     }
// }

exports.finalForgotPassword = function(req,res,next){
    try {
        const email = req.query.email;
        console.log(email);
        firestore.collection('users').where('email','=',email).get();
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();
          
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: "29shreya11@gmail.com", // generated ethereal user
                pass: "fgjycagzmbwrzlim", // generated ethereal password
              },
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: 'shreya shah', // sender address
              to: email, // list of receivers
              subject: "forgot password", // Subject line
              text: "url for forgot password", // plain text body
              html: "<p>Hello</p></br> Here is your link to rest password <br/>http://localhost:4200/reset-password <br/> Thanks And Regards, <br/> Shopping Cart team", // html body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
          
          main().catch(console.error);
          res.send({message:'mail sent',status:'success'});  
    
    } catch (error) {
        console.log(error);
        res.send({message:'error in sending mail',status:'fail'});
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
        res.send({message:'error in updating user',status:'fail'});
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
            const userDetail = {
                id : data.id,
                name : data.data().name,
                email : data.data().email,
                phone : data.data().phone,
                role_id : data.data().role_id,
                city_id : data.data().city_id,
                state_id : data.data().state_id,
                country_id : data.data().country_id

            }
            res.send({message:'user fetch Successfully',status:'success',data: userDetail});
        }
    } catch (error) {
        console.log(error);
        res.send({message:'error in getting user',status:'fail'});
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        const id =req.params.Id;
        await firestore.collection('users').doc(id).delete();
        res.send({message:'user deleted Successfully',status:'success'});
    } catch (error) {
        console.log(error);
        res.send({message:'error in deleting user',status:'fail'});
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
        res.send({message:'error in logout',status:'fail'});
    }
}

exports.resetPassword = async(req,res,next)=>{
    try {
        const email = req.query.email;
        const Password = req.body.password;
        firestore.collection('users').where('email','=',email).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                doc.ref.update({password: Password})
            });
       })
            res.send({message:"Password reset successfully! ",status:'success'})
    } catch (error) {
        console.log(error);
        res.send({message:'error in updating passowrd',status:'fail'});
    }
}