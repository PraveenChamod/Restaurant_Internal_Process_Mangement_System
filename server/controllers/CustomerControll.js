
import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import { createToken, handleErrors } from "../util/AuthUtil.js";
import { transporter } from "../util/NotificationUtil.js";
import { UploadProfileImage } from "./AuthController.js";
import Foods from "../models/Foods.js";
import Stripe from 'stripe';
import globalArray from "../Data/GlobalArray.js";
import dotenv from 'dotenv';
import multer from "multer";
import ShoutoutClient from 'shoutout-sdk';

const imageStorage = multer.diskStorage({
    destination:"images/Users",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})

var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTU0YTA3MC0yYTBkLTExZWQtYTIyZC0yMzNlNTJkNzg3MDYiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2MjA0NzQ4OSwiZXhwIjoxOTc3NjY2Njg5LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczMzgxIiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.7ODAC-X1QFiFFKMpoe23iD-mpEPRkO6twmBsvQvgnOM';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);
const image = multer({storage:imageStorage}).single('image');
dotenv.config();
const stripe = Stripe('sk_test_51MbCY3GuiFrtKvgKRlTswuS2ZIlFZdYvBKP9TKGA4OdrqC5pgCreZkQJpNrX0d09pccyDr2iuXrTDrVBEkXKV9S000q80NzIvV');
const maxAge = 3 * 24 * 60 * 60;
process.env.GEOCODER_PROVIDER = 'google';
process.env.GEOCODER_API_KEY = 'AIzaSyCzww-sVilydidTfz54KfF50tWWIwgahC4';

// Method : POST
// End Point : "api/v1/customer/AddCustomer";
// Description : Register Customer
export const RegisterCustomer = async (req,res)=>{
    const {Name,Password,ConfirmPassword,ContactNumber,Email} = req.body;
    const existingCustomer = await Customer.findOne({Email:Email});
    const existingUser = await User.findOne({Email:Email});
    try {
        if(existingCustomer === null || existingUser === null){
            const salt = await GenerateSalt();
            const encryptedPassword = await GeneratePassword(Password,salt);
            const confirmEncryptedPassword = await GeneratePassword(ConfirmPassword,salt);
            const Role="Customer";
            const createCustomer = await Customer.create({
                Name:Name,
                Password:encryptedPassword,
                ConfirmPassword:confirmEncryptedPassword,
                ContactNumber:ContactNumber,
                Email:Email,
                Role:Role
            });
            const createUser = await User.create({
                Name:Name,
                Password:encryptedPassword,
                ConfirmPassword:confirmEncryptedPassword,
                ContactNumber:ContactNumber,
                Email:Email,
                Role:Role
            })
            //send sms
            const contactNumber = "94"+ContactNumber.slice(1);
            console.log(contactNumber);
            var message = {
                source: 'ShoutDEMO',
                destinations: [contactNumber],
                 content: {
                     sms: `Welcome ${Name} to Resto. You successfully registerd to our system.`
                },
                 transports: ['sms']
              };
              client.sendMessage(message, (error, result) => {
                if (error) {
                    console.error('error ', error);
                } else {
                    console.log('result ', result);
                }
              });
            // await sendRegistrationSms(to,from,ConfirmationMessage);

            //send Email
            const mailOption = {
                from : 'resto6430@gmail.com',
                to : Email,
                subject : 'Registration Confrimation',
                text : `Hi ${Name} Welcome to Resto. You successfully registered to the system.`
            }

            transporter.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    console.log(info.response);
                }
            })

            const token = createToken(createUser._id,createUser.Email);
            res.json(token);
            res.status(200).json({
                status: 'success',
                token
            });
        }
        else{
            return res.json({message:"A Customer is already exist"});
        }
    } catch (error) {
        res.status(500).json({
            status: 'Server error',
            message: error.message
        });
       //res.status(500).json({error:error.message});
       //return res.status(500).json({error:error.message});
    }
}

// const getLocation =(address)=>{
//     geoCorder.geocode(address,async (req,res)=>{
//         console.log(res);
//     })
// }

// Method : PATCH
// End Point : "api/v1/customer/UpdateProfile/:Email";
// Description : Update Profile
export const UpdateProfile = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === 'Customer'){
            const {Email} = req.params;
            if(user.Email == Email){
                const logedCustomer = await Customer.findOne({Email:Email}).populate('Email');
                const logedUser = await User.findOne({Email:Email}).populate('Email');
                if(logedCustomer !== null){
                        // image(req,res,(err)=>{
                        //     if(err){
                        //         console.log(err)
                        //     }
                        //     else{
                        //         logedUser.ProfileImage = req.file.filename;
                        //         logedCustomer.ProfileImage = req.file.filename
                        //     }
                        // })
                    const {Name,ContactNumber,Address,Email} = req.body;
                    const locationAddress = JSON.stringify({Address});
                    // const uploadImage = await logedCustomer.save();
                    // const uploadImage1 = await logedUser.save();
                    // getLocation(locationAddress);
                    const userDetails = {Name:Name,Email:Email,ContactNumber:ContactNumber,Address:Address}
                    const updateCustomer = await Customer.findByIdAndUpdate(logedCustomer._id,userDetails,{new:true});
                    console.log(updateCustomer);
                    const updateUser = await User.findByIdAndUpdate(logedUser._id,userDetails,{new:true});
                    console.log(updateUser);
                    createToken(updateCustomer._id,updateCustomer.Email);
                    res.status(201).json({
                        message:'Update User Successfully',
                        data:{
                            updateUser
                        }
                    });
                }
                else{
                    res.json("error");
                }
            }
            else{
                res.status(400).json({message:'This user is not logged in to the system'});
            }
        }
        else{
            res.status(400).json({message:'User has not previlages'});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const selectItems = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const {SerialNo} = req.body;
            const food = await Foods.findOne({SerialNo:SerialNo}).populate('SerialNo');
            globalArray.Add(food);
        }
    } catch (error) {
        
    }
}
const calculateOrderAmount = (items) => {
    let amount ;
    items.map(item=>{
        return(
            amount += item.TotalPrice 
        )
    })
  };
  
// Method : POST
// End Point : "api/v1/customer/PlaceOrder/:OrderId";
// Description : PlaceOrder
export const PlaceOrder = async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
