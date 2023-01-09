import mongoose from "mongoose";
import ServiceProviders from "../models/ServiceProviders.js";
import User from "../models/User.js";
import { createToken, findUser } from "../util/AuthUtil.js";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";

// Method : GET
// End Point : "api/v1/admin/GetUsers"
// Description : Get All Users

export const getUsers = async (req,res)=>{
    const users = await User.find();

    if(users !== null){
        return res.json(users);
    }
    else{
        return res.json({"message":"There are no any records exits!"});
    }
    
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
// End Point : "api/v1/admin/GetUserByEmail"
// Description : Get User By Email

export const getUserByEmail = async (req,res)=>{
    const Email  = req.body;
    try {
        const FindUser = await User.findOne({Email:Email});
        console.log(FindUser);
        if(FindUser !== null){
            res.json(FindUser);
        }
    } catch (error) {
        console.log(error.message);
        res.status(501).json(error.message);
    }
}

// Method : GET
// End Point : "api/v1/admin/GetUsersByRole"
// Description : Get Users By Role

export const getUsersByRole = async(req,res)=>{
    const Role = req.body;
    try {
        const Users = await User.find({Role:Role});
        if(Users !== null){
            res.json(Users);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Method : PATCH
// End Point : "api/v1/admin/UpdateUserById/:Email"
// Description : Update User By Email

export const updateUserByEmail = async (req,res)=>{
    
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
    res.json({message : `User is deleted`});
}

// Method : DELETE
// End Point : "api/v1/admin/DeleteUsers"
// Description : Delete Users

export const deleteUsers = async (req,res)=>{
    const users = await User.find();
    if(users !== null){
        await User.deleteMany();
        res.json({message:`All users are removed`});
    }
    return res.status(404).send(`There are no users exits`);
}

// Method : POST
// End Point : "api/v1/admin/RegisterServiceProvider";
// Description : Register Service Providers

const maxAge = 3 * 24 * 60 * 60;
export const RegisterServiceProviders = async (req,res)=>{
    const {Name,Password,ConfirmPassword,ContactNumber,Email,Role} = req.body;
    const existingCustomer = await ServiceProviders.findOne({Email:Email});
    const existingUser = await User.findOne({Email:Email});

    try {
        if(existingCustomer !== null || existingUser !== null){
            return res.json({"message":"A User is already exist"});
        }
        else{
            const salt = await GenerateSalt();
            const encryptedPassword = await GeneratePassword(Password,salt);
            const confirmEncryptedPassword = await GeneratePassword(ConfirmPassword,salt);
        
            const createServiceProvider = await ServiceProviders.create({
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
            const token = createToken(createUser._id,createUser.Email);
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000});
            res.json(token);
        }
    
    } catch (error) {
        const errors = handleErrors(error);
        console.log(error.message);
        res.status(500).json(errors);
    }
    
}

