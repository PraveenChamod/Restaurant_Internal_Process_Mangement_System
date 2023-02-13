
import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import geoCorder from 'geocoder';
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import { createToken, handleErrors } from "../util/AuthUtil.js";
import { sendRegistrationSms, transporter } from "../util/NotificationUtil.js";
import { UploadProfileImage } from "./AuthController.js";
import Order from "../models/Order.js";
import Foods from "../models/Foods.js";

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
        if(existingCustomer !== null || existingUser !== null){
            return res.json({"message":"A Customer is already exist"});
        }
        else{
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
            const ConfirmationMessage = 1234
            const from = "Vonage APIs";
            const to = "+94"+ContactNumber.slice(1);
            console.log(to);
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
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getLocation =(address)=>{
    geoCorder.geocode(address,async (req,res)=>{
        console.log(res);
    })
}

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
                if(logedUser !== null){

                    const {Name,ContactNumber,Address,Email1} = req.body;
                    const locationAddress = JSON.stringify({Address});
                    getLocation(locationAddress);
                    const userDetails = {Name:Name,Email:Email1,ContactNumber:ContactNumber,Address:Address}
                    const updateCustomer = await Customer.findByIdAndUpdate(logedCustomer._id,logedCustomer,{new:true});
                    const updateUser = await User.findByIdAndUpdate(logedUser._id,logedUser,{new:true});
                    console.log(updateUser);
                    createToken(updateCustomer._id,updateCustomer.Email);
                    res.status(201).json({message:'Update User Successfully'});
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

// Method : POST
// End Point : "api/v1/customer/OrderItem";
// Description : Ordering Item
export const OrderItem = async(req,res)=>{
    try {
        const user = req.user;
        console.log(user);
        if(user.Role === 'Customer'){
            const {FoodName,SerialNo,Category,Quantity} = req.body;
            const findFood = await Foods.findOne({SerialNo:SerialNo}).populate('SerialNo');
            if(findFood){
                const TotalPrice = findFood.Price * Quantity;
                if(user.Address !== null){
                    const createOrder = await Order.create({
                        Customer:{
                            Name:user.Name,
                            Email:user.Email,
                            ContactNumber:user.ContactNumber,
                            Address:user.Address,
                        },
                        Foods:{
                            FoodName:FoodName,
                            SerialNo:SerialNo,
                            Category:Category,
                            Quantity:Quantity,
                        },
                        TotalPrice:TotalPrice,
                        Date:Date.now()
                    })
                    res.status(200).json(createOrder);
                }
                else{
                    res.status(400).json({message:'Add Delivery Address First'});
                }
            }
            else{
                req.status(404).json({message:'This Food is not available'});
            }
        }
    } catch (error) {
        
    }
}