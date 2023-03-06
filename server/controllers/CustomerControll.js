
import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import { createToken, handleErrors } from "../util/AuthUtil.js";
import { transporter } from "../util/NotificationUtil.js";
import { UploadProfileImage } from "./AuthController.js";
import Order from "../models/Order.js";
import Foods from "../models/Foods.js";
import Stripe from 'stripe';
import Table from "../models/Tables.js";
import TableReservation from "../models/TableReservation.js";
import globalArray from "../Data/GlobalArray.js";
import dotenv from 'dotenv';
import multer from "multer";
import Reviews from "../models/Reviews.js";
import Cart from "../models/Cart.js";
import { getFoods } from "./ServiceProvidersControll.js";
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
        }
        else{
            return res.json({"message":"A Customer is already exist"});
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

// Method : POST
// End Point : "api/v1/customer/OrderItem";
// Description : Ordering Item
export const OrderItem = async(req,res,next)=>{
    try {
        const user = req.user;
        if(user.Role === 'Customer'){
            const {SerialNo,Quantity,paymentMethod} = req.body;
            const findFood = await Foods.findOne({SerialNo:SerialNo}).populate('SerialNo');
            const logedCustomer = await Customer.findOne({Email:user.Email}).populate('Email');
            if(findFood){
                const ItemPrice = findFood.Price * Quantity;
                const TotalPrice = 0;
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
                    line_items: [
                      {
                        price_data: {
                          currency: 'lkr',
                          product_data: [{
                            name: findFood.name,
                          }],
                          unit_amount: findFood.Price,
                        },
                        quantity: findOrder.Quantity,
                      },
                    ],
                    mode: 'payment',
                    success_url: 'http://localhost:3000/checkout-success',
                    cancel_url: 'http://localhost:3000/cart',
                  });
                // const session = await stripe.checkout.sessions.create({
                //     payment_method_types: ['card'],
                //     success_url: `${req.protocol}://${req.get('host')}/?order=${_id}&price=${findOrder.TotalPrice}`,
                //     // success_url: `${req.protocol}://${req.get('host')}/my-tours`,
                //     cancel_url: `${req.protocol}://${req.get('host')}/order`,
                //     customer_email: user.Email,
                //     client_reference_id:_id,
                //     line_items: [{
                //         price_data: {
                //             currency: 'usd',
                //             unit_amount: 2000,
                //             product_data:{
                //                 name:findFood.FoodName
                //             }
                //         },
                //         quantity: 1,
                //       }],
                //     mode:'payment'
                // });
            
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


// Method : POST
// End Point : "api/v1/customer/Reveiw";
// Description : Add Review
export const AddReview = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const {Review,Rate} = req.body;
                const session = await mongoose.startSession();
                const customer = await Customer.findOne({Email:user.Email});
                // console.log(session);
                try {
                    session.startTransaction();
                    const ReviewData = {Customer:customer.id,Review:Review,Rate:Rate}
                    const newreview = await Reviews.create([ReviewData],{session});
                    const commit = await session.commitTransaction();
                    session.endSession();
                
                    res.status(201).json({
                        status: 'success',
                        message: 'Submitted Review successfully',
                        data:{
                            newreview
                        }
                    })
                } catch (error) {
                    res.status(500).json(error.message);
                }
                // return res.json(review);
            
        }   
        else{
            res.json({message:"You are not a Customer"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error.message);
    }
}

// Method : POST
// End Point : "api/v1/customer/Addtocart";
// Description : Add to cart

export const AddToCart = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const {foodId,quantity} = req.body;
            const existingUser = await Customer.findOne({Email:user.Email});
            let cart = await Cart.findOne({Customer:existingUser.id});
            const session = await mongoose.startSession();
            try {
                if(cart){
                    let ItemIndex = cart.Foods.findIndex(key=>key.food == foodId);
                    console.log(ItemIndex);
                    if(ItemIndex > -1){
                        let foodItem = cart.Foods[ItemIndex]
                        foodItem.Quantity = quantity;
                        cart.Foods[ItemIndex] = foodItem;
                    }
                    else{
                        cart.Foods.push({food:foodId,Quantity:quantity});
                        console.log(cart.Foods);
                    }
                    cart = await cart.save();
                    res.status(201).json({
                        status:'Success',
                        message:'Add Item into Cart',
                        data:{
                            cart
                        }
                    })
                }else{
                    session.startTransaction();
                    const newCart = await Cart.create([
                        {
                            Customer:existingUser.id,
                            Foods:[{
                                food:foodId,
                                Quantity:quantity
                            }]
                        }],
                        {session}
                    )
                    const commit = await session.commitTransaction();
                    session.endSession();
                    res.status(201).json({
                        status:'Success',
                        message:'Add Item into Cart',
                        data:{
                            newCart
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({
                    status:'Error',
                    message:error.message
                })
            }
            
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        })
    }
} 


// Method : POST
// End Point : "api/v1/customer/MyCart";
// Description : View Cart

export const viewCart = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const customer = await Customer.findOne({Email:user.Email});
            
            Cart.findOne({ Customer: customer.id })
            .populate({
                path: 'Foods.food',
                model: 'Foods'
            })
            .exec((err, cart) => {
                if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
                }
                if (!cart) {
                return res.status(404).send('Cart not found');
                }
                // Access the populated food details
                const foods = cart.Foods.map((item) => ({
                name: item.food.FoodName,
                image:item.food.FoodImage,
                price: item.food.Price,
                category:item.food.Category,
                quantity: item.Quantity
                }));
                res.json(foods);
            });
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        })
    }
}