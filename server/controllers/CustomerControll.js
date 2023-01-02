import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import Customer from "../models/Customer.js";
import { GeneratePassword } from "../util/PasswordUtility.js";

export const CreateCustomer = async (req,res)=>{
    const {Name,Password,ConfirmPassword,ContactNumber,Address,Email,Role} = req.body;
    const existingCustomer = await Customer.findOne({Email:Email});
    if(existingCustomer !== null){
        return res.json({"message":"A Customer is already exist"});
    }
    // const salt = GenerateSalt();
    // const encryptedPassword = GeneratePassword(Password.toString(),salt);

    const createCustomer = await Customer.create({
        Name:Name,
        Password:Password,
        ConfirmPassword:ConfirmPassword,
        ContactNumber:ContactNumber,
        Address:Address,
        Email:Email,
        
        Role:Role
    });
    return res.json(createCustomer);

}

export const getCustomers = async (req,res)=>{
    const Customer = new Customer();
    
}