import mongoose from "mongoose";
import Customer from "../models/Customer";
import Customer from "../models/Customer";
import Item from "../models/Items";

export const createCustomer = async (req,res)=>{
    const Customer  = new Customer(req.body);
    try{
        await Customer.save();
        res.status(200).json(Customer);
    }catch(error){
        res.status(404).json({
            error:error.message
        })
    }
}