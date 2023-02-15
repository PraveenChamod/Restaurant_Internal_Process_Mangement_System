import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import ServiceProviders from "../models/ServiceProviders.js";
import User from "../models/User.js";
import { createToken, findUser } from "../util/AuthUtil.js";
import { GeneratePassword, GenerateSalt } from "../util/PasswordUtility.js";
import path from 'path';
import { transporter } from "../util/NotificationUtil.js";
// Method : GET
// End Point : "api/v1/admin/GetUsers"
// Description : Get All Users

export const getUsers = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const users = await User.find();
            if(users !== null){
                return res.json(users);
            }
            else{
                return res.json({"message":"There are no any records exits!"});
            }
        }   
        else{
            res.json({message:"Admin is not logging to the system"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error.message);
    }
}

// Method : GET
// End Point : "api/v1/admin/GetUserByEmail"
// Description : Get User By Email

export const getUserByEmail = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const Email = req.body.Email;
            const findUser = await User.findOne({Email:Email});
            if(findUser === null){
                res.json('this user dosen\'t exits');
            }
            res.json(findUser);
        }
        else{
            res.json({message:`Admin is note logging to the system`});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error.message);
    }
    
}

// Method : GET
// End Point : "api/v1/admin/GetUsersByRole"
// Description : Get Users By Role

export const getUsersByRole = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const Role = req.body.Role;
            const Users = await User.find({Role:Role}).populate('Role');
            if(Users !== null){
                let users = [];
                Users.map(user=>{
                    if(user.Role === Role){
                        users.push(user);
                    }
                })
                res.json(users);
            }
        }
        else{
            res.json({message:`Admin is note logging to the system`});
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Method : PATCH
// End Point : "api/v1/admin/UpdateUser/:Email"
// Description : Update User By Email

export const updateUserByEmail = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const {Email} = req.params;
            const findUser = await User.findOne({Email:Email});
            const {Name,ContactNumber,Role} = req.body;
            console.log(findUser);
            if(!mongoose.Types.ObjectId.isValid){
                return res.status(404).send(`The id ${id} is not valied`);
            }
            if(findUser !== null){
                const user = {Name:Name,ContactNumber:ContactNumber,Email:Email,Role:Role};
                await User.findByIdAndUpdate(findUser._id,user,{new:true});
                res.json(user);
            }   
        }
        else{
            res.json({message:`Admin is note logging to the system`});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Method : DELETE
// End Point : "api/v1/admin/DeleteUser/:Email"
// Description : Delete User By Email

export const deleteUser = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const {Email} = req.params;
            const findUser = await User.findOne({Email:Email});
            const findCustomer = await Customer.findOne({Email:Email});
            const findServiceProvider = await ServiceProviders.findOne({Email:Email});
            
            if(findUser !== null){
                console.log(findUser);
                await User.findByIdAndRemove(findUser._id);
                if(findCustomer !== null){
                    await Customer.findByIdAndRemove(findCustomer._id);
                }
                else if(findServiceProvider !== null){
                    await ServiceProviders.findByIdAndRemove(findServiceProvider._id);
                }
                res.json({message : `User is deleted`});
            }
            else{
                res.json({message:`There is no any user with ${Email} email`});
            }   
        }
        else{
            res.json({message:`Admin is note logging to the system`});
        }   
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Method : DELETE
// End Point : "api/v1/admin/DeleteUsers"
// Description : Delete Users

export const deleteUsers = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Admin"){
            const users = await User.find();
            const findCustomers = await Customer.find();
            const findServiceProviders = await ServiceProviders.find();
            if(users !== null){
                await User.deleteMany();
                if(findCustomers !== null){
                    await Customer.deleteMany();
                }
                else if(findServiceProviders !== null){
                    await ServiceProviders.deleteMany();
                }
                res.json({message:`All users are removed`});
            }
            else{
                return res.status(404).send(`There are no users exits`);
            }   
        }
        else{
            res.json({message:`Admin is note logging to the system`});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Method : POST
// End Point : "api/v1/admin/RegisterServiceProvider";
// Description : Register Service Providers

const maxAge = 3 * 24 * 60 * 60;
export const RegisterServiceProviders = async (req,res)=>{
    try {
    const user = req.user;
        if(user.Role === "Admin"){
            const {Email,Role} = req.body;
            const Password = "12345678";
            const existingServiceProvider = await ServiceProviders.findOne({Email:Email});
            const existingUser = await User.findOne({Email:Email});
            if(existingServiceProvider !== null || existingUser !== null){
                return res.json({"message":"A User is already exist"});
            }
            else{
                const salt = await GenerateSalt();
                const encryptedPassword = await GeneratePassword(Password,salt);

                if(Role === "Admin"){
                    const user = await User.findOne({Role:Role}).populate('Role');
                    console.log(user);
                    if(user !== null){
                        res.json('Admin is already exist');
                    }
                    else{
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
                        const token = createToken(createUser._id,createUser.Email);
                        res.json(token);
                    }
                }
                else{
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
                    res.json(token);
                }
                
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
    
}

