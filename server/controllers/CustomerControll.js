
// import mongoose from "mongoose";
// import Customer from "../models/Customer.js";
// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
// import { createToken, handleErrors } from "../util/AuthUtil.js";
// import { transporter } from "../util/NotificationUtil.js";
// import { UploadProfileImage } from "./AuthController.js";
// import Foods from "../models/Foods.js";
// import Stripe from 'stripe';
// import globalArray from "../Data/GlobalArray.js";
// import dotenv from 'dotenv';
// import multer from "multer";
// import ShoutoutClient from 'shoutout-sdk';

// const imageStorage = multer.diskStorage({
//     destination:"images/Users",
//     filename: (req,file,cb)=>{
//         cb(null,Date.now()+'_'+file.originalname)
//     }
// })



// // const getLocation =(address)=>{
// //     geoCorder.geocode(address,async (req,res)=>{
// //         console.log(res);
// //     })
// // }



// export const selectItems = async(req,res)=>{
//     try {
//         const user = req.user;
//         if(user.Role === "Customer"){
//             const {SerialNo} = req.body;
//             const food = await Foods.findOne({SerialNo:SerialNo}).populate('SerialNo');
//             globalArray.Add(food);
//         }
//     } catch (error) {
        
//     }
// }
// const calculateOrderAmount = (items) => {
//     let amount ;
//     items.map(item=>{
//         return(
//             amount += item.TotalPrice 
//         )
//     })
//   };
  
// // Method : POST
// // End Point : "api/v1/customer/PlaceOrder/:OrderId";
// // Description : PlaceOrder
// export const PlaceOrder = async (req, res) => {
//     const { items } = req.body;
  
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   }
