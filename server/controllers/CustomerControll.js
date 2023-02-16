
import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import { createToken, handleErrors } from "../util/AuthUtil.js";
import { sendRegistrationSms, transporter } from "../util/NotificationUtil.js";
import { UploadProfileImage } from "./AuthController.js";
import Order from "../models/Order.js";
import Foods from "../models/Foods.js";
import Stripe from 'stripe';
import Table from "../models/Tables.js";
import TableReservation from "../models/TableReservation.js";

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
                if(logedUser !== null){

                    const {Name,ContactNumber,Address,Email1} = req.body;
                    const locationAddress = JSON.stringify({Address});
                    // getLocation(locationAddress);
                    const userDetails = {Name:Name,Email:Email1,ContactNumber:ContactNumber,Address:Address}
                    const updateCustomer = await Customer.findByIdAndUpdate(logedCustomer._id,userDetails,{new:true});
                    console.log(updateCustomer);
                    const updateUser = await User.findByIdAndUpdate(logedUser._id,userDetails,{new:true});
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
export const OrderItem = async(req,res,next)=>{
    try {
        const user = req.user;
        // console.log(user);
        if(user.Role === 'Customer'){
            const {SerialNo,Quantity,paymentMethod} = req.body;
            const findFood = await Foods.findOne({SerialNo:SerialNo}).populate('SerialNo');
            const logedCustomer = await Customer.findOne({Email:user.Email}).populate('Email');
            if(findFood){
                const TotalPrice = findFood.Price * Quantity;
                if(user.Address !== null){
                    const OrderData = {Customer:logedCustomer.id,Quantity:Quantity,TotalPrice:TotalPrice,paymentMethod:paymentMethod,Foods:findFood.id}
                
                    const session = await mongoose.startSession();
                    // console.log(session);
                    try {
                        session.startTransaction();
                        const updateCustomer = await Customer.findByIdAndUpdate(logedCustomer,{OrderFoods:true},{new:true,runValidators:true}).session(session);
                        const updateFood = await Foods.findByIdAndUpdate(findFood._id,{OrderItems:true},{new:true,runValidators:true}).session(session);
                        const newOrder = await Order.create([OrderData],{session});
                        const commit = await session.commitTransaction();
                        session.endSession();
                    
                        res.status(201).json({
                            status: 'success',
                            message: 'Order created successfully',
                            data: {
                                newOrder
                            }
                        })
                    } catch (error) {
                        res.status(500).json(error.message);
                    }
                    next();
                }
                else{
                    res.status(400).json({message:'Add Delivery Address First'});
                }
            }
            else{
                res.status(404).json({message:'This Food is not available'});
            }
        }
    } catch (error) {
        
    }
}

// Method : POST
// End Point : "api/v1/customer/PlaceOrder/:OrderId";
// Description : PlaceOrder
export const PlaceOrder = async(req,res)=>{
    try {
        const {_id} = req.params;
        console.log(_id);
        const user = req.user;
        const findOrder = await Order.findById(_id);
        if(findOrder){
            if(findOrder.paymentMethod === "Card Payments"){
                const findFood = await Foods.findById({_id:findOrder.Foods});
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    success_url: `${req.protocol}://${req.get('host')}/?order=${_id}&price=${findOrder.TotalPrice}`,
                    // success_url: `${req.protocol}://${req.get('host')}/my-tours`,
                    cancel_url: `${req.protocol}://${req.get('host')}/order`,
                    customer_email: user.Email,
                    client_reference_id:_id,
                    line_items: [{
                        price_data: {
                            currency: 'usd',
                            unit_amount: 2000,
                            product_data:{
                                name:findFood.FoodName
                            }
                        },
                        quantity: 1,
                      }],
                    mode:'payment'
                });
            
                // 3) Create session as response
                res.status(200).json({
                    status: 'success',
                    session
                });
            }
        }
        else{
            res.status(404).json({
                status:'Error',
                message:'Order is not found'
            })
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}


// Method : POST
// End Point : "api/v1/customer/ReserveTable";
// Description : Reserve Table
export const ReserveTable = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const {TableNo,NoOfPersons,Date,Time} = req.body;
            const findTable = await Table.findOne({TableNo:TableNo}).populate('TableNo');
            const logedCustomer = await Customer.findOne({Email:user.Email}).populate('Email');
            if(findTable){
                const amount = findTable.price;
                if(findTable.NoOfPersons < NoOfPersons){
                    res.status(300).json({
                        status:'Warning',
                        message:`This Table Cannot allocated for ${NoOfPersons} persons` 
                    });
                }
                else{
                    const ReservationData = {Customer:logedCustomer.id,TableNo:TableNo,NoOfPersons:NoOfPersons,amount:amount,Table:findTable.id,Date:Date,Time:Time}
                
                    const session = await mongoose.startSession();
                    // console.log(session);
                    try {
                        session.startTransaction();
                        const updateFood = await Table.findByIdAndUpdate(findTable._id,{Status:"Reserved"},{new:true,runValidators:true}).session(session);
                        const newReservation = await TableReservation.create([ReservationData],{session});
                        const commit = await session.commitTransaction();
                        session.endSession();
                    
                        res.status(201).json({
                            status: 'success',
                            message: 'Reservation successfully',
                            data: {
                                newReservation
                            }
                        })
                    } catch (error) {
                        res.status(400).json({
                            status:'Error',
                            message:error.message
                        });
                    }
                }
            }
            else{
                res.status(404).json({
                    status:'Error',
                    message:'This Food is not available'
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        });
    }
}