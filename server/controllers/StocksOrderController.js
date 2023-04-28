import mongoose from "mongoose";
import ServiceProviders from "../models/ServiceProviders.js";
import StocksOrder from "../models/StockOrder.js";
import SupplierItem from "../models/SupplierItem.js";

// Method : POST
// End Point : "api/v1/SupplierOrder";
// Description : Add Supplier Order Item
export const addSupplierOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const session = await mongoose.startSession();
            try {
                session.startTransaction();
                const newOrder = await StocksOrder.create([
                        req.body
                    ],
                    {session}
                )
                const commit = await session.commitTransaction();
                session.endSession();
                res.status(201).json({
                    status:'Success',
                    message:'Your order is placed',
                    data:{
                        newOrder
                    }
                })
            } catch (error) {
                res.status(400).json({
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

// Method : Get
// End Point : "api/v1/SupplierOrder";
// Description : Get supplier order
export const ViewSupplierOrder = async (req,res)=>{
    try {
        const user = req.user;
        let placedorders = [];
        let orderDetails;
        const orders = await StocksOrder.find();
        if(user.Role === "Manager"){
            for(const order of orders){
                console.log(order);
                try {
                    const populatedOrder = await StocksOrder.findById(order.id)
                        .populate({
                            path:'Supplier',
                            model:'ServiceProvider'
                        })
                        .populate({
                            path:'Manager',
                            model:'ServiceProvider'
                        })
                        .populate({
                            path:'Items.item',
                            model:'SupplierItem'
                        })
                        .exec();
                        console.log(populatedOrder);
                       if(populatedOrder.Manager.id === user.id){

                            const Name = populatedOrder.Supplier.Name;
                            const Email = populatedOrder.Supplier.Email;
                            const Status = populatedOrder.Status;
                            const TotalPrice = populatedOrder.TotalPrice;
                            const item = populatedOrder.Items.flatMap((item)=>{
                                if(item.id !== undefined){
                                    return item.item.Items.map(stockitem=>{
                                        // console.log(stockitem);
                                        return{
                                            id:stockitem._id,
                                            ItemName:stockitem.ItemName,
                                            Price:stockitem.Price,
                                            Quantity:item.Quantity
                                        }
                                    })
                                }
                            });
                            
                            console.log(item);
                            orderDetails = {
                                orderId : order.id,
                                supplierName : Name,
                                supplierEmail : Email,
                                OrderStatus : Status,
                                TotalPrice : TotalPrice,
                                item
                            };
                            placedorders.push(orderDetails);
                       }
                } catch (error) {
                    res.status(400).json({
                        statuts:"Error",
                        message:error.message
                    });
                }
            }
            res.status(200).json({
                status: "Success",
                message: "All Order Details",
                data: {
                    placedorders
                }
              });
        }
        else if(user.Role === "Supplier"){
            for(const order of orders){
                try {
                    const populatedOrder = await StocksOrder.findById(order.id)
                        .populate({
                            path:'Manager',
                            model:'ServiceProvider'
                        })
                        .populate({
                            path:'Items.item',
                            model:'SupplierItem'
                        })
                        .populate({
                            path:'Supplier',
                            model:'ServiceProvider'
                        })
                        .exec();
                        if(populatedOrder.Supplier.id === user.id){
                           
                            const Name = populatedOrder.Manager.Name;
                            const Email = populatedOrder.Manager.Email;
                            const Status = populatedOrder.Status;
                            const TotalPrice = populatedOrder.TotalPrice;
                            
                            const item = populatedOrder.Items.flatMap((item)=>{
                                if(item.id !== undefined){
                                    return item.item.Items.map(stockitem=>{
                                        // console.log(stockitem);
                                        return{
                                            ItemName:stockitem.ItemName,
                                            Price:stockitem.Price,
                                            Quantity:item.Quantity
                                        }
                                    })
                                }
                            });
                            orderDetails = {
                                orderId : order.id,
                                supplierName : Name,
                                supplierEmail : Email,
                                OrderStatus : Status,
                                item
                            };
                            placedorders.push(orderDetails);
                        }
                } catch (error) {
                    res.status(400).json({
                        statuts:"Error",
                        message:error.message
                    });
                }
            }
            res.status(200).json({
                status: "Success",
                message: "All Order Details",
                data: {
                    placedorders
                }
              });
        }
    }catch(error) {
        
    }
}


// export const ViewReceivedOrders = async(req,res)=>{
//     try {
//         const user = req.user;
//         if(user.Role === "Supplier"){
//             const findItems = await SupplierItem.find(); //model eka change karaganna
//             console.log(findItems);
//             res.status(201).json({
//                 status: 'success',
//                 message: 'Received Orders',
//                 data: {
//                     findItems
//                 }
//             })
//         }
//         else{
//             res.status(401).json({
//                 status: 'Error',
//                 message: 'User Have No Authorization to do this action',
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             status:'Server Error',
//             message:error.message
//         })
//     }
//  }


// Method : POST
// End Point : "api/v1/stockorderconfirmation/:id'"
// Description : Confirm Stock Order
export const ConfirmStockOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Supplier"){
            const {id} = req.params;
            const findOrder = await StocksOrder.findById(id);
            
            if(findOrder !== null){
                const session = await mongoose.startSession();
                try {
                    session.startTransaction();
                    const UpdateOrder = await StocksOrder.findByIdAndUpdate(findOrder.id,{Status:'Confirm'},{new:true,runValidators:true}).session(session);
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
        return res.status(500).json({
            status:'Server Error',
            message:error.message,
        });
    }
}

// Method : GET
// End Point : "api/v1/stockorderbyid/:id'"
// Description : View Stock Order By Id
export const ViewSupplierOrderById = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Supplier"){
            const {id} = req.params;
            let orderDetails;
            try {
                const populatedOrder = await StocksOrder.findById(id)
                .populate({
                    path:'Manager',
                    model:'ServiceProvider'
                })
                .populate({
                    path:'Items.item',
                    model:'SupplierItem'
                })
                .populate({
                    path:'Supplier',
                    model:'ServiceProvider'
                })
                .exec();
                if(populatedOrder.Supplier.id === user.id){
                    const Name = populatedOrder.Manager.Name;
                    const Email = populatedOrder.Manager.Email;
                    const Status = populatedOrder.Status;
                    const TotalPrice = populatedOrder.TotalPrice;
                    const item = populatedOrder.Items.flatMap((item)=>{
                        if(item.id !== undefined){
                            return item.item.Items.map(stockitem=>{
                                // console.log(stockitem);
                                return{
                                    ItemName:stockitem.ItemName,
                                    Price:stockitem.Price,
                                    Quantity:item.Quantity
                                }
                            })
                        }
                    });
                    orderDetails = {
                        
                        ManagerName : Name,
                        ManagerEmail : Email,
                        OrderStatus : Status,
                        item
                    };
                }
                res.status(200).json({
                    status:'Success',
                    message:`Details of Order ${id}`,
                    data:{
                      orderDetails
                    }
                })
            } catch (error) {
                res.status(400).json({
                    statuts:"Error",
                    message:error.message
                });
            }
        }
        else{
            res.status(401).json({
                status:"Error",
                message:"This user dosen't has authorization to do this operation"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status:'Server Error',
            message:error.message,
        });
    }
}

// // Method : GET
// // End Point : "api/v1/SupplierOrderById/:id";
// // Description : get Supplier Order conform
// export const getSupplierOrderById = async (req,res)=>{
//     try {
//         const user = req.user;
//         console.log({user});
//         if(user.Role === "Supplier"){
//             const{id} = req.params;
//             console.log(req.params);
//             const Order = await StocksOrder.findOne({_id:id});
//             if(Order !== null){
//                 res.status(200).json({
//                     status:"Success",
//                     message:"Order Deatils",
//                     data:{
//                         food
//                     }
//                 });
//             }
//             else{
//                 res.status(404).json({
//                     status:"Error",
//                     message:"There are no any recordes"
//                 });
//             }
//         }
//         else{
//             res.status(401).json({
//                 status:"Error",
//                 message:'Only Supplier has access to do this operation'
//             });
//         }
//     } catch (error) {
//         res.status(501).json({
//             status:"Server Error",
//             message:error.message
//         });
//     }
// }