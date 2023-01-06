import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";

// Method : GET
// End Point : "api/v1/admin/GetUsers"
// Description : Get All Users

export const getUsers = async (req,res)=>{
    const users = await User.find();

    if(users !== null){
        return res.json(users);
    }
    return res.json({"message":"There are no any records exits!"});
    
}

// Method : GET
// End Point : "api/v1/admin/GetUserById/:id"
// Description : Get User By ID

export const getUserById = async (req,res)=>{
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(user !== null){
        return res.json(user);
    }
    return res.json({"message":"There is no any user exits with given id"});
}

// Method : GET
// End Point : "api/v1/admin/GetUserByEmail/:Email"
// Description : Get User By Email

export const getUsersByEmail = async (req,res)=>{
    const { Email } = req.params;
    const findUser = await User.findOne({Email:Email});
    if(findUser !== null){
        res.json(findUser);
    }
    res.json({"message":"This user dosen't exits"});
}

// Method : PATCH
// End Point : "api/v1/admin/UpdateUserById/:Email"
// Description : Update User By Email

export const updateUserByEmail = async (req,res)=>{
    const {userEmail} = req.params;
    const findUser = await User.findOne({Email:userEmail});
    if(!mongoose.Types.ObjectId.isValid){
        return res.status(404).send(`The Email ${userEmail} is note valid`);
    }
    if(findUser !== null){
        res.json(findUser);
        const {Name,ContactNumber,Address,Email,Role} = req.body;
        const user = {Name,ContactNumber,Address,Email:userEmail,Role}
        await User.findOneAndUpdate(Email,user,{new:true});
        res.json(user);
    }
    else{
        res.json({"message":"This user dosen't exits"});
    }
    
    
    
}

// Method : DELETE
// End Point : "api/v1/admin/DeleteUser/:Email"
// Description : Delete User By Email

export const deleteUser = async (req,res)=>{
    const {Email} = req.params;
    const findUser = await User.findOne({Email:Email});
    if(!mongoose.Types.ObjectId.isValid){
        return res.status(404).send(`The Email ${Email} is note valid`);
    }
    if(findUser === null){
        res.json({message:`There is no any user with ${Email} email`});
    }
    await User.findOneAndRemove(Email);
    res.json({message : `User is deleted who has the email address ${Email}`});
}

// Method : DELETE
// End Point : "api/v1/admin/DeleteUsers"
// Description : Delete Users

export const deleteUsers = async (req,res)=>{
    const users = await Customer.find();
    if(users !== null){
        await Customer.deleteMany();
        res.json({message:`All users are removed`});
    }
    return res.status(404).send(`There are no users exits`);
}