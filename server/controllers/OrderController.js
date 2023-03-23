
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
            console.log(req.body);
            const logedCustomer = await Customer.findOne({Email:user.Email}).populate('Email');
            const session = await mongoose.startSession();
            try {
                if(logedCustomer.Address !== null){
                        session.startTransaction();
                        const newOrder = await Order.create([
                                req.body
                            ],
                            {session}
                        )
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
            const findOrders = await Order.find();
            let Orders = [];
            for (const order of findOrders) {
                  let OrderDetails;
                  console.log(order);
                  try {
                    const populatedOrder = await Order.findById(order.id)
                      .populate({
                        path: 'Customer',
                        model: 'Customer'
                      })
                      .populate({
                        path: 'Foods.food',
                        model: 'Foods'
                      })
                      .exec();
                    
                    const Name = populatedOrder.Customer.Name;
                    const Email = populatedOrder.Customer.Email;
                    const ContactNumber = populatedOrder.Customer.ContactNumber;
                    const CustomerAddress = populatedOrder.Customer.Address;
                    const food = populatedOrder.Foods.map((item) => ({
                      FoodName: item.food.FoodName,
                      Category: item.food.Category,
                      image: item.food.FoodImage,
                      quantity: item.Quantity,
                      PaymentMethod: populatedOrder.paymentMethod
                    }));
                    OrderDetails = {
                      OrderId:order.id,
                      customerName: Name,
                      customerEmail:Email,
                      ContactNumber:ContactNumber,
                      CustomerAddress:CustomerAddress,
                      food,
                      TotalPrice: populatedOrder.TotalPrice,
                      Status:populatedOrder.Status,
                      Date:order.Date
                    };
                    Orders.push(OrderDetails);
                  } catch (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                  }
            }
              
              res.status(200).json({
                status: "Success",
                message: "All Order Details",
                data: {
                  Orders
                }
              });
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
// End Point : "api/v1/PendingOrders";
// Description : Get Pending Orders
export const ViewPendingOrders = async(req,res,next)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const findOrders = await Order.find();
            let pendingOrders = [];
            for (const order of findOrders) {
                if (order.Status === "Pending") {
                  let OrderDetails;
                  try {
                    const populatedOrder = await Order.findById(order.id)
                      .populate({
                        path: 'Customer',
                        model: 'Customer'
                      })
                      .populate({
                        path: 'Foods.food',
                        model: 'Foods'
                      })
                      .exec();
                    
                    const Name = populatedOrder.Customer.Name;
                    const Customer_id = populatedOrder.Customer.id;
                    const Email = populatedOrder.Customer.Email;
                    const ContactNumber = populatedOrder.Customer.ContactNumber;
                    const food = populatedOrder.Foods.map((item) => ({
                      FoodName: item.food.FoodName,
                      Category: item.food.Category,
                      image: item.food.FoodImage,
                      quantity: item.Quantity,
                      PaymentMethod: populatedOrder.paymentMethod
                    }));
                    OrderDetails = {
                      OrderId:order.id,
                      customerName: Name,
                      customerEmail:Email,
                      customerId : Customer_id,
                      ContactNumber:ContactNumber,
                      food,
                      TotalPrice: populatedOrder.TotalPrice,
                    };
                    pendingOrders.push(OrderDetails);
                  } catch (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                  }
                }
            }
              
              res.status(200).json({
                status: "Success",
                message: "Pending Order Details",
                data: {
                  pendingOrders
                }
              });
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
        if(user.Role === "Staff-Member" || user.Role === "Deliverer"){
            const {id} = req.params;
            let pendingOrders = [];
            let OrderDetails;
            try {
                const populatedOrder = await Order.findById(id)
                  .populate({
                    path: 'Customer',
                    model: 'Customer'
                  })
                  .populate({
                    path: 'Foods.food',
                    model: 'Foods'
                  })
                  .exec();
                console.log(populatedOrder);
                const Name = populatedOrder.Customer.Name;
                const Email = populatedOrder.Customer.Email;
                const CustomerAddress = populatedOrder.Customer.Address
                const ContactNumber = populatedOrder.Customer.ContactNumber;
                const Address = populatedOrder.Customer.Address;
                const lat = populatedOrder.Customer.lat;
                const lang = populatedOrder.Customer.lang;
                const food = populatedOrder.Foods.map((item) => ({
                  FoodName: item.food.FoodName,
                  Category: item.food.Category,
                  image: item.food.FoodImage,
                  quantity: item.Quantity,
                  PaymentMethod: populatedOrder.paymentMethod
                }));
                OrderDetails = {
                  OrderId:id,
                  customerName: Name,
                  customerEmail:Email,
                  ContactNumber:ContactNumber,
                  Address:Address,
                  lat:lat,
                  lang:lang,
                  food,
                  TotalPrice: populatedOrder.TotalPrice,
                };
                pendingOrders.push(OrderDetails);
                res.status(200).json({
                    status:'Success',
                    message:`Details of Order ${id}`,
                    data:{
                        pendingOrders
                    }
                })
              } catch (err) {
                console.error(err);
                return res.status(500).send('Server Error');
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

// Method : GET
// End Point : "api/v1/Deliverer/OrderDetails"; 
// Description : Get Orders that deliverer have to deliver 
export const CheckOrderDetails = async(req, res)=>{
  const user = req.user;
  try {
      if(user.Role === "Deliverer"){
          const findOrder = await Order.find();
          const deliverer = await ServiceProviders.findById(user.id);
          let pendingOrders = [];
          for (const order of findOrder) {
              if (order.Status === "Confirm") {
                  console.log(order);
                let OrderDetails;
                try {
                  const populatedOrder = await Order.findById(order.id)
                    .populate({
                      path: 'Customer',
                      model: 'Customer'
                    })
                    .populate({
                      path: 'Foods.food',
                      model: 'Foods'
                    })
                    .populate({
                      path:'ServiceProvider',
                      model:'ServiceProvider'
                    })
                    .exec();
                  if(populatedOrder.ServiceProvider.id === deliverer.id){
                      const Name = populatedOrder.Customer.Name;
                      const Email = populatedOrder.Customer.Email;
                      const ContactNumber = populatedOrder.Customer.ContactNumber;
                      const food = populatedOrder.Foods.map((item) => ({
                      FoodName: item.food.FoodName,
                      Category: item.food.Category,
                      image: item.food.FoodImage,
                      quantity: item.Quantity,
                      PaymentMethod: populatedOrder.paymentMethod
                      }));
                      OrderDetails = {
                      OrderId:order.id,
                      customerName: Name,
                      customerEmail:Email,
                      ContactNumber:ContactNumber,
                      food,
                      TotalPrice: populatedOrder.TotalPrice,
                      };
                      pendingOrders.push(OrderDetails);
                  }
                } catch (err) {
                  console.error(err);
                  return res.status(500).send('Server Error');
                }
              }
          }
          res.status(201).json({
              status: 'success',
              message: 'Received Orders',
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

