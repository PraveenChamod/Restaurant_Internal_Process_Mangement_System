import ServiceProviders from "../models/ServiceProviders.js";
import User from "../models/User.js";
import { createToken } from "../util/AuthUtil.js";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import Item from "../models/Items.js";
import Foods from "../models/Foods.js";
import Offers from "../models/Offers.js"
import multer from "multer";
import { transporter } from "../util/NotificationUtil.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";
import Table from "../models/Tables.js";
import TableReservation from "../models/TableReservation.js";
import SupplierItem from "../models/SupplierItem.js";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Method : POST
// End Point : "api/v1/serviceProvider/RegisterOutletStaff";
// Description : Register Outlet Staff

const maxAge = 3 * 24 * 60 * 60;
export const RegisterOutletStaff = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role == "Manager"){
            const {Email,Role} = req.body;
            const Password = "12345678";
            const existingStaffMember = await ServiceProviders.findOne({Email:Email});
            const existingUser = await User.findOne({Email:Email});
            if(existingStaffMember !== null || existingUser !== null){
                return res.json({"message":"A User is already exist"});
            }
            else{
                const salt = await GenerateSalt();
                const encryptedPassword = await GeneratePassword(Password,salt);
                if(Role === "Staff-Member" || Role === "Deliverer" ){
                    const createServiceProvider = await ServiceProviders.create({
                        Password:encryptedPassword,
                        Email:Email,
                        Role:Role
                    });
                    const createUser = await User.create({
                        Password:encryptedPassword,
                        Email:Email,
                        Role:Role
                    })
                    //send Email
                    //send Email
                    if(createUser.Role !== "Customer"){
                        const mailOption = {
                            from : 'resto6430@gmail.com',
                            to : Email,
                            subject : 'Registration Confrimation',
                            attachments:[{
                                filename : 'logo.png',
                                path:'E:/WEB/Restaurant_Management_System/server/Template/logo.png',
                                cid:'logo'
                            },
                            {
                                filename : 'welcome_vector.png',
                                path:'E:/WEB/Restaurant_Management_System/server/Template/welcome_vector.png',
                                cid:'welcome'
                            }],
                            html: { path:'E:/WEB/Restaurant_Management_System/server/Template/Email.html' }
                        }
    
                        transporter.sendMail(mailOption,(err,info)=>{
                            if(err){
                                console.log(err.message);
                            }
                            else{
                                console.log(info.response);
                            }
                        })
                    }
                    const token = createToken(createUser._id,createUser.Email);
                    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
                    res.json(token);
                }else{
                    res.status(401).json('Role must be Staff-member or Deliverer');
                }
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}


// Method : POST
// End Point : "api/v1/serviceProvider/AddItems";
// Description : Add Items

export const addItems = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {ItemName,Quantity,UnitPrice,WholeSalePrice,Category} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingItem = await Item.findOne({SerialNo:SerialNumber});
            if(existingItem !== null){
                res.json({message:"This food is already added"});
            }
            else{
                const createItem = await Item.create({
                    SerialNo:SerialNumber,
                    ItemName:ItemName,
                    Category:Category,
                    WholeSalePrice:WholeSalePrice,
                    Quantity:Quantity,
                    UnitPrice:UnitPrice,
                })
                res.json(createItem);
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}


// Method : POST
// End Point : "api/v1/serviceProvider/__________";
// Description : Add Supplier Order Item

export const addSupplierOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {Item,Quantity,Date} = req.body;
            const session = await mongoose.startSession();
            try {
                session.startTransaction();
                const neworder = await SupplierItem.create({
                    SupplierItem:Item,
                    SupplierItem:Quantity,
                    SupplierItem:Date
                })
                res.json(neworder);               
                session.endSession();
            
                res.status(201).json({
                    status: 'success',
                    message: 'successfully'
                })
            } catch (error) {
                res.status(500).json(error.message);
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}


// Method : GET
// End Point : "api/v1/serviceProvider/getFoods";
// Description : Get Items

export const getItems = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const items = await Item.find();
            if(items !== null){
                res.json(items);
            }
            else{
                res.status(404).json({message:"There are no any recordes please add items"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : GET
// End Point : "api/v1/serviceProvider/getFoodsByCategory";
// Description : Get Foods By Category

export const getItemByCategory = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const Category = req.body.Category;
            const findItems = await Item.find({Category:Category}).populate('Category');
            if(findItems !== null){
                let Items = [];
                findItems.map(Item=>{
                    if(Item.Category === Category){
                        Items.push(Item);
                    }
                })
                res.json(Items);
            }
            else{
                res.json({message:"Category dosen't exist"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : DELETE
// End Point : "api/v1/serviceProvider/Manager/deleteItemBySerialNo/:SerialNo";
// Description : Get Foods By Category

export const deleteItemBySerialNo = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {SerialNo} = req.params;
            const Item = await Item.findOne({SerialNo:SerialNo});
            console.log(Item);
            if(Item !== null){
                await Item.findByIdAndRemove(Item._id);
                res.json({message:`${SerialNo} item Removed`});
            }
            else{
                res.status(404).json({message:"Food doesn't found, Please enter valid serail no"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : POST
// End Point : "api/v1/serviceProvider/food/AddFoods";
// Description : Get Foods By Category
const imageStorage = multer.diskStorage({
    destination:"images/Foods",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const image = multer({storage:imageStorage}).single('image');
var FoodImage = "";
export const uploadImage = async(req,res)=>{
    
        image(req,res,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                FoodImage = req.file.filename;
                res.json(FoodImage);
            }
    })
}
export const addFoods = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === 'Manager' || user.Role === 'Admin'){
            const {FoodName,Price,Category} = req.body;
            console.log(FoodName);
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            console.log(SerialNumber);
            const existingFood = await Foods.findOne({SerialNo:SerialNumber});
            if(existingFood !== null){
                res.status(501).json({message:`This item is already added`});
            }else{
                
                const AddFoods = await Foods.create({
                    FoodName:FoodName,
                    Price:Price,
                    SerialNo:SerialNumber,
                    Category:Category,
                    FoodImage:FoodImage
                })
                res.status(200).json({
                    status: 'success',
                    message:"Added new food",
                    data:{
                        AddFoods
                    }
                });
            }
        }
        else{
            res.status(501).json("This user dosen't has authorization to do this operation");
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

//get foods
export const getFoods = async (req,res)=>{

    try {
        const user = req.user;
        if(user.Role === "Staff-Member" || user.Role === "Manager" || user.Role=== "Admin" || user.Role === "Customer"){
            const foods = await Foods.find();
            if(foods !== null){
                res.json(foods);
            }
            else{
                res.status(404).json({message:"There are no any recordes plase add foods"});
            }
        }
        else{
            res.status(401).json('Only Staff member has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

export const getFoodByCategory = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member" || user.Role === "Customer"){
            const Category = req.body.Category;
            const findFoods = await Foods.find({Category:Category}).populate('Category');
            if(findFoods !== null){
                let foods = [];
                findFoods.map(food=>{
                    if(Foods.Category === Category){
                        foods.push(food);
                    }
                })
                res.json(foods);
            }
            else{
                res.json({message:"Category dosen't exist"});
            }
        }
        else{
            res.status(401).json('Only Staff-Member has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}
//update food
export const updateFood = async(req,res)=>{
    try{
        const {SerialNo} = req.params;
        const Food = await Foods.findOneAndUpdate({SerialNo:SerialNo},{
            ...req.body
        })
        if(!Food){
            res.status(404).json("No such food item to update")
        }
        res.status(200).json(Food);
       
    }
    catch(error){
        res.status(error.message);
    }
}

//Delete foods
export const  deleteFoods =async (req,res)=>{

    try{
         const user = req.user;
         if(user.Role === "Manager" || user.Role === "Admin"){
            const {SerialNo} = req.params;
            const Food = await Foods.findOne({SerialNo:SerialNo});
            console.log(Food);
            if(Food !== null){
                await Food.findByIdAndRemove(Food._id);
                res.json({message:`${SerialNo} Food Removed`});
            }
            else{
                res.status(404).json({message:"Food doesn't found, Please enter valid serail no"});
            }
         }else{
            res.status(501).json("This user not authorized for this operation")
         }

    }catch(error){
        res.status(501).json(error.message);

    }
   
}

// offers #########3

//Add offer
export const addOffer  = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {Foods,SpecialPrice} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingOffer = await Offers.findOne({SerialNo:SerialNumber});
            
            if(existingOffer !== null){
                res.status(501).json({message:`This offer is already added`});
            }else{
                const AddOffer = await Offer.create({
                    Foods:Foods,
                    SpecialPrice:SpecialPrice,                   
                    SerialNo:SerialNumber,
                    
                })
                res.json(AddOffer);
            }
        }
        else{
            res.status(501).json("This user dosen't has authorization to do this operation");
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}



//View Offers

export const getOffers = async (req,res)=>{

    try {
        const user = req.user;
        if(user.Role === "Staff-Member" || user.Role === "Customer"){
            const offers = await Offers.find();
            if(offers !== null){
                res.json(offers);
            }
            else{
                res.status(404).json({message:"No offers found."});
            }
        }
        else{
            res.status(401).json('Only Staff member has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

//Update offers
export const updateOffer = async(req,res)=>{
    try{
        const {SerialNo} = req.params;
        const offer = await Offers.findOneAndUpdate({SerialNo:SerialNo},{
            ...req.body
        })
        if(!offer){
            res.status(404).json("No such offer to update")
        }
        res.status(200).json(offer);
       
    }
    catch(error){
        res.status(error.message);
    }
}

//Delete offers


export const  deleteOffers =async (req,res)=>{

    try{
         const user = req.user;
         if(user.Role==="Staff-Member"){
            const {SerialNo} = req.params;
            const offer = await Offers.findOne({SerialNo:SerialNo});
            if(offer !== null){
                await Offer.findByIdAndRemove(offer._id);
                res.json({message:`${SerialNo} Offer Removed`});
            }
            else{
                res.status(404).json({message:"Offer doesn't found, Please enter valid serail no"});
            }
         }else{
            res.status(501).json("This user not authorized for this operation")
         }

    }catch(error){
        res.status(501).json(error.message);

    }
   
}

// Method : GET
// End Point : "api/v1/serviceProvider/Orders/AllOrders";
// Description : Get All Orders
export const ViewAllOrders = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member" || user.Role === "Manager"){
            const allorders = await Order.find();
            console.log(allorders);            
            res.status(201).json({
                status: 'success',
                message: 'All Orders',
                data: {
                    allorders
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
            status:'Server Error',
            message:error.message
        })
    }
 }

//+++++++++++++++++++++++++++++++++++++++++++++++Tables CRUD++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Method : POST
// End Point : "api/v1/serviceProvider/Tables/AddTable";
// Description : Add Table
export const AddTable = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Admin"){
            const {TableNo,NoOfPersons,price} = req.body;
            const existingTable = await Table.findOne({TableNo:TableNo}).populate('TableNo');
            if(existingTable){
                res.status(400).json({
                    status: 'Error',
                    message:"This Table is Already Exist",
                })
            }
            else{
                const addTable = await Table.create({
                    TableNo:TableNo,
                    NoOfPersons:NoOfPersons,
                    price:price
                })
                res.status(201).json({
                    status:'Success',
                    message:'A New Table is Added',
                    data:{
                        addTable
                    }
                })

            }
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


// Method : Get
// End Point : "api/v1/serviceProvider/getTables";
// Description : Get Tables

export const ViewTables = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Staff-Member" || user.Role === "Admin"){
            const tables = await Table.find();
            if(tables !== null){
                res.json(tables);
            }
            else{
                res.status(404).json({message:"There are no any recordes please add tables"});
            }
        }
        else{
            res.status(401).json('Only Manager, Staff-Member & Admin have access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++staff-member+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Method : GET
// End Point : "api/v1/serviceProvider/Orders/PendingOrders";
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
// End Point : "api/v1/serviceProvider/Orders/ViewOrder/:_id";
// Description : View Order
 export const ViewOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {_id} = req.params;
            const findOrder = await Order.findById(_id);
            if(findOrder !== null){
                res.status(201).json({
                    status: 'success',
                    message: 'Order Details',
                    data: {
                        findOrder
                    }
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
// End Point : "api/v1/serviceProvider/Orders/getDeliverers";
// Description : Get Available Deliverers
 export const getAvailableDeliverers = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const Deliverers = await ServiceProviders.find({Role:"Deliverer"}).populate('Role');
            if(Deliverers !== null){
                let deliverers = [];
                    Deliverers.map(user=>{
                        console.log(user)
                        if(user.Order === undefined){
                            deliverers.push(user);
                        }
                    })
                    res.status(201).json({
                        status: 'Success',
                        message: 'Aavilable Deliverers',
                        data:{
                            deliverers
                        }
                    })
                return deliverers; 
            }
            else{
                res.status(401).json({
                    status: 'Warning',
                    message: 'There are no available deliverers',
                })
            }
        }
        else{
            res.status(401).json({
                status: 'Error',
                message: 'This user has not authorization to do this operation',
            }) 
        }
        
    } catch (error) {
        res.status(401).json({
            status: 'Error',
            message: error.message,
        });
    }
 }

// Method : POST
// End Point : "api/v1/serviceProvider/Orders/ConfirmOrder/:_id";
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
// End Point : "api/v1/serviceProvider/Reservations/PendingReservations";
// Description : View Reservation
export const ViewPendingReservations = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const findReservations = await TableReservation.find();
            let pendingReservations = [];
            findReservations.map(order=>{
                    if(order.Status === "Pending"){
                        pendingReservations.push(order);
                    }
                })
            res.status(201).json({
                status: 'success',
                message: 'Pending Reservations',
                data: {
                    pendingReservations
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

// Method : GET
// End Point : "api/v1/serviceProvider/Reservations/ViewReservation/:_id";
// Description : View Order
export const ViewReservation = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {_id} = req.params;
            console.log(_id);
            const findReservation = await TableReservation.findById(_id);
            if(findReservation !== null){
                res.status(201).json({
                    status: 'success',
                    message: 'Reservation Details',
                    data: {
                        findReservation
                    }
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
// End Point : "api/v1/serviceProvider/Reservation/ConfirmReservation/:_id";
// Description : Confirm Reservation
export const SendReservationConfirmation = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {_id} = req.params;
            const findReservation = await TableReservation.findById(_id);
            // const findTable = await Table.findById(findReservation.Table);
            if(findReservation !== null){
                const session = await mongoose.startSession();
                try {
                    session.startTransaction();
                    const UpdateReservation = await TableReservation.findByIdAndUpdate(findReservation.id,{Status:'Confirm'},{new:true,runValidators:true}).session(session);
                    const UpdateTable = await Table.findByIdAndUpdate(findReservation.Table._id)
                    await session.commitTransaction();
                    session.endSession();
                    
                    res.status(201).json({
                        status: 'success',
                        message: 'Table Reservation is Confirmed',
                        data: {
                            UpdateReservation
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Deliverer+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Supplier +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Method : GET
// End Point : "api/v1/serviceProvider/Items/ReceivedOrders";
// Description : Get Received Items

export const ViewReceivedOrders = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Supplier"){
            const findItems = await Item.find(); //model eka change karaganna
            console.log(findItems);
            res.status(201).json({
                status: 'success',
                message: 'Received Orders',
                data: {
                    findItems
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
            status:'Server Error',
            message:error.message
        })
    }
 }

