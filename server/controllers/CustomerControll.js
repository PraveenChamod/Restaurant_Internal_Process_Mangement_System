import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

import { GeneratePassword, GenerateSalt, validatePassword } from "../util/PasswordUtility.js";
const findUser = async (Email)=>{
    await Customer.findOne({Email:Email});
}
export const RegisterCustomer = async (req,res)=>{
    const {Name,Password,ConfirmPassword,ContactNumber,Address,Email,Role} = req.body;
    const existingCustomer = await Customer.findOne({Email:Email});
    const existingUser = await User.findOne({Email:Email});

    try {
        if(existingCustomer !== null || existingUser !== null){
            return res.json({"message":"A Customer is already exist"});
        }

        const salt = await GenerateSalt();
        const encryptedPassword = await GeneratePassword(Password,salt);
        const confirmEncryptedPassword = await GeneratePassword(ConfirmPassword,salt);
    
        const createCustomer = await Customer.create({
            Name:Name,
            Password:encryptedPassword,
            ConfirmPassword:confirmEncryptedPassword,
            ContactNumber:ContactNumber,
            Address:Address,
            Email:Email,
            Role:Role
        });
        const createUser = await User.create({
            Name:Name,
            Password:encryptedPassword,
            ConfirmPassword:confirmEncryptedPassword,
            ContactNumber:ContactNumber,
            Address:Address,
            Email:Email,
            Role:Role
        })
        return res.json(createUser);
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    
}

export const LogInCustomer = async (req,res)=>{
    
    const {Email,Password} = req.body;
    const existingUser = await Customer.findOne({Email:Email});
    
    if(existingUser !== null){
        const result = await validatePassword(Password,existingUser.Password);
        if(result){
            res.json({"message":"User Login Completed"});
        }
        else{
            res.status(404).json({"message":"Password doesn't match"});
        }
    }else{
        res.status(404).json({"message":"Invalid User credentials"});
    }
}