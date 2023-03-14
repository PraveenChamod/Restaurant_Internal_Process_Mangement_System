
import mongoose from "mongoose";
import Stripe from "stripe";
import Customer from "../models/Customer.js";
import Foods from "../models/Foods.js";
import Order from "../models/Order.js";
import ServiceProviders from "../models/ServiceProviders.js";

const stripe = Stripe('sk_test_51MbCY3GuiFrtKvgKRlTswuS2ZIlFZdYvBKP9TKGA4OdrqC5pgCreZkQJpNrX0d09pccyDr2iuXrTDrVBEkXKV9S000q80NzIvV');
// Method : POST
// End Point : "api/v1/OrderItem";
// Description : Ordering Item
export const OrderItem = async(req,res,next)=>{
    try {
        const user = req.user;
        if(user.Role === 'Customer'){
            console.log( req.body);
            const logedCustomer = await Customer.findOne({Email:user.Email}).populate('Email');
            const session = await mongoose.startSession();
            try {
                if(user.Address !== null){
                        session.startTransaction();
                        const newOrder = await Order.create([
                                req.body
                            ],
                            {session}
                        )
                        console.log(newOrder);
                        const commit = await session.commitTransaction();
                        session.endSession();
                        res.status(201).json({
                            status:'Success',
                            message:'Your order is successed',
                            data:{
                                newOrder
                            }
                        })
                }
                else{
                    res.status(400).json({
                        status:'Error',
                        message:'Set Your Address First'
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


export const payToOrder = async (req, res) => {
    const TotalPrice = req.body.amount * 100;
    const Email = req.body.receipt_email;
    console.log(Email);
    console.log("Payment Request recieved for this ruppess", TotalPrice);
  
    const payment = await stripe.paymentIntents.create({
      amount: TotalPrice,
      currency: "lkr",
      receipt_email:Email
    });
  
    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  }
  
// Method : GET
// End Point : "api/v1/Orders";
// Description : Get All Orders
export const ViewAllOrders = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Admin"){
            const Orders  = await Order.find();
            if(Orders){
                res.status(200).json({
                    status:'Success',
                    message:'Details of All Orders',
                    data:{
                        Orders
                    }
                })
            }
            else{
                res.status(404).json({
                    status:'Error',
                    message:'There are no any orders exist'
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
// Method : GET
// End Point : "api/v1/PendingOrders";
// Description : Get Pending Orders
export const ViewPendingOrders = async(req,res,next)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const findOrders = await Order.find();
            console.log(findOrders);
            let pendingOrders = [];
            findOrders.map(order=>{
                    if(order.Status === "Pending"){
                        pendingOrders.push(order);
                    }
                })
            res.status(201).json({
                status: 'success',
                message: 'Pending Orders',
                data: {
                    pendingOrders
                }
            })
            next();
        }
        else{
            res.status(401).json({
                status: 'Error',
                message: 'User Have No Authorization to do this action',
            })
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        })
    }
 }

// Method : GET
// End Point : "api/v1/Order/:id";
// Description : View Order
 export const ViewOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member" ){
            const {_id} = req.params;
            console.log(_id);
            const findOrder = await Order.findById(_id);
            console.log(findOrder);
            if(findOrder !== null){
                res.status(201).json({
                    status: 'success',
                    message: 'Order Details',
                    data: {
                        findOrder
                    }
                })  
            }
            else{
                res.status(404).json({
                    status:'Not Found',
                    message:'There are no any Order related to given id'
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
// End Point : "api/v1/OrderConfirmation/:id"; 
// Description : Confirm Order
export const SendOrderConfrimation = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {_id} = req.params;
            const findOrder = await Order.findById(_id);
            if(findOrder !== null){
                const session = await mongoose.startSession();
                try {
                    session.startTransaction();
                    const {Email} = req.body;
                    const findDeliverer = await ServiceProviders.findOne({Email:Email}).populate('Email');
                    console.log(findDeliverer);
                    const UpdateOrder = await Order.findByIdAndUpdate(findOrder.id,{ServiceProvider:findDeliverer.id,Status:'Confirm'},{new:true,runValidators:true}).session(session);
                    const updateDeliverer = await ServiceProviders.findByIdAndUpdate(findDeliverer.id,{Order:findOrder.id},{new:true,runValidators:true}).session(session);
                    console.log(updateDeliverer);
                    await session.commitTransaction();
                    session.endSession();
                    
                    res.status(201).json({
                        status: 'success',
                        message: 'Order is Confirmed',
                        data: {
                            UpdateOrder
                        }
                    })
                } catch (error) {
                    res.status(401).json({
                        status: 'Error',
                        message: error.message,
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            status: 'Server Error',
            message: error.message,
        });
    }
 }

 export const CheckOrderDetails = async(req, res)=>{
    const user = req.user;
    try {
        if(user.Role === "Deliverer"){
            const findOrder = await Order.find();
            const deliverer = await ServiceProviders.findById(user.id);
            let pendingOrders = [];
            findOrder.map(order=>{
                if(order.ServiceProvider === deliverer.id){
                    pendingOrders.push(order);
                } 
            })
            res.status(201).json({
                status: 'success',
                message: 'Pending Orders',
                data: {
                    pendingOrders
                }
            })
        }
        else{
            res.status(401).json({
                status: 'Error',
                message: 'User Have No Authorization to do this action',
            })
        }   
    } catch (error) {
        res.status(500).json({
            status: 'Server Error',
            message: error.message,
        });
    }
}