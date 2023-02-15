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
                    const mailOption = {
                        from : 'resto6430@gmail.com',
                        to : Email,
                        subject : 'Registration Confrimation',
                        text : `Hi Welcome to Resto. You successfully registered to the system.`
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
                res.status(404).json({message:"There are no any recordes plase add items"});
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
// End Point : "api/v1/serviceProvider/Manager/AddFoods";
// Description : Get Foods By Category
const imageStorage = multer.diskStorage({
    destination:"images/Foods",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
const image = multer({storage:imageStorage}).single('image');

export const addFoods = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {FoodName,Price,Category} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingFood = await Foods.findOne({SerialNo:SerialNumber});
            var FoodImage;
            image(req,res,(err)=>{
                if(err){
                    console.log(err)
                }
                else{
                    FoodImage = req.file.filename;
                }
            })
            if(existingFood !== null){
                res.status(501).json({message:`This item is already added`});
            }else{
                const AddFoods = await Foods.create({
                    FoodName:FoodName,
                    Quantity:Quantity,
                    Price:Price,
                    SerialNo:SerialNumber,
                    Category:Category,
                    FoodImage:FoodImage
                })
                res.json(AddFoods);
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
        if(user.Role === "Staff-Member"){
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
        if(user.Role === "Staff-Member"){
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
         if(user.Role==="Staff-Member"){
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
        if(user.Role === "Staff-Member"){
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
            console.log(Food);
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++staff-member+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


 export const ViewPendingOrders = async(req,res,next)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const findOrders = await Order.find();
            if(findOrders.Status === "Pending"){
                const PendingOrders = findOrders;
                res.status(201).json({
                    status: 'success',
                    message: 'Pending Orders',
                    data: {
                        PendingOrders
                    }
                })
                next();
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

 export const ViewOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {OrderId} = req.params;
            const findOrder = await Order.findById({_id:OrderId});
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

 export const getDeliverers = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const Role = req.body.Role;
            const Deliverers = await User.find({Role:Role}).populate('Role');
            if(Deliverers !== null){
                if(Deliverers.Order !== undefined){
                    let users = [];
                    Deliverers.map(user=>{
                        if(user.Role === Role){
                            users.push(user);
                        }
                    })
                    return users;
                }
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
 export const SendOrderConfrimation = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {_id} = req.params;
            const findOrder = await Order.findById({_id:_id});
            if(findOrder !== null){
                const session = await mongoose.startSession();
                try {
                    session.startTransaction();
                    
                } catch (error) {
                    
                }
            }
        }
    } catch (error) {
        
    }
 }
