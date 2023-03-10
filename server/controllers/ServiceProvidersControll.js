// import ServiceProviders from "../models/ServiceProviders.js";
// import User from "../models/User.js";
// import { createToken } from "../util/AuthUtil.js";
// import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
// import Item from "../models/Items.js";
// import Foods from "../models/Foods.js";
// import Offers from "../models/Offers.js"
// import multer from "multer";
// import { transporter } from "../util/NotificationUtil.js";
// import Order from "../models/Order.js";
// import mongoose from "mongoose";
// import Table from "../models/Tables.js";
// import TableReservation from "../models/TableReservation.js";
// import SupplierItem from "../models/SupplierItem.js";

// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // Method : POST
// // End Point : "api/v1/serviceProvider/RegisterOutletStaff";
// // Description : Register Outlet Staff

// const maxAge = 3 * 24 * 60 * 60;
// export const RegisterOutletStaff = async (req,res)=>{
//     try {
//         const user = req.user;
//         if(user.Role == "Manager"){
//             const {Email,Role} = req.body;
//             const Password = "12345678";
//             const existingStaffMember = await ServiceProviders.findOne({Email:Email});
//             const existingUser = await User.findOne({Email:Email});
//             if(existingStaffMember !== null || existingUser !== null){
//                 return res.json({"message":"A User is already exist"});
//             }
//             else{
//                 const salt = await GenerateSalt();
//                 const encryptedPassword = await GeneratePassword(Password,salt);
//                 if(Role === "Staff-Member" || Role === "Deliverer" ){
//                     const createServiceProvider = await ServiceProviders.create({
//                         Password:encryptedPassword,
//                         Email:Email,
//                         Role:Role
//                     });
//                     const createUser = await User.create({
//                         Password:encryptedPassword,
//                         Email:Email,
//                         Role:Role
//                     })
//                     //send Email
//                     //send Email
//                     if(createUser.Role !== "Customer"){
//                         const mailOption = {
//                             from : 'resto6430@gmail.com',
//                             to : Email,
//                             subject : 'Registration Confrimation',
//                             attachments:[{
//                                 filename : 'logo.png',
//                                 path:'D:/Group Project/New folder/restaurant_management_system/server/Template/logo.png',
//                                 cid:'logo'
//                             },
//                             {
//                                 filename : 'welcome_vector.png',
//                                 path:'D:/Group Project/New folder/restaurant_management_system/server/Template/welcome_vector.png',
//                                 cid:'welcome'
//                             }],
//                             html: { path:'D:/Group Project/New folder/restaurant_management_system/server/Template/Email.html' }
//                         }
    
//                         transporter.sendMail(mailOption,(err,info)=>{
//                             if(err){
//                                 console.log(err.message);
//                             }
//                             else{
//                                 console.log(info.response);
//                             }
//                         })
//                     }
//                     const token = createToken(createUser._id,createUser.Email);
//                     res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
//                     res.json(token);
//                 }else{
//                     res.status(401).json('Role must be Staff-member or Deliverer');
//                 }
//             }
//         }
//         else{
//             res.status(401).json('Only Manager has access to do this operation');
//         }
//     } catch (error) {
//         res.status(501).json(error.message);
//     }
// }




