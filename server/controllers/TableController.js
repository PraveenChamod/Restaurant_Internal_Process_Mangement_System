import Table from "../models/Tables.js";


// Method : POST
// End Point : "api/v1/Table";
// Description : Add Table
export const AddTable = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Admin"){
            const {TableNo,NoOfPersons,price} = req.body;
            console.log(TableNo);
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
// End Point : "api/v1/Tables"; 
// Description : Get Tables

export const ViewTables = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Staff-Member" || user.Role === "Admin"){
            const tables = await Table.find();
            if(tables !== null){
                res.status(200).json({
                    status:"Success",
                    message:"Details of all tables",
                    data:{
                        tables
                    }
                });
            }
            else{
                res.status(404).json({
                    status:"Not Found",
                    message:"There are no any recordes please add tables"
                });
            }
        }
        else{
            res.status(401).json({
                status:"Error",
                message:'Only Manager, Staff-Member & Admin have access to do this operation'
            });
        }
    } catch (error) {
        res.status(501).json({
            status:"Server Error",
            message:error.message
        });
    }
}

// Method : Get
// End Point : "api/v1/table/:id";
// Description : Get Table By Id
export const getTableById = async(req,res)=>{
    const user = req.user;
    try {
        if(user.Role === "Manager" || user.Role === "Admin"){
            const{id} = req.params;
            const table = await Table.findOne({_id:id});
            if(table !== null){
                res.status(200).json({
                    status:"Success",
                    message:"Table Deatils",
                    data:{
                        table
                    }
                });
            }
            else{
                res.status(404).json({
                    status:"Error",
                    message:"There are no any recordes plase add foods"
                });
            }
        }
        else{
            res.status(401).json({
                status:"Error",
                message:'User has not authorization to perform this operation'
            })
        }
    } catch (error) {
        res.status(501).json({
            status:"Server Error",
            message:error.message
        });
    }
}

// Method : PATCH
// End Point : "api/v1/table/:id";
// Description : update Table
export const updateTable = async(req,res)=>{
    try{
        const user = req.user;
        if(user.Role === 'Manager' || user.Role === 'Admin'){
            const {id} = req.params;
            const table = await Table.findByIdAndUpdate(id,{
                ...req.body
            },{new:true});
            if(!table){
                res.status(404).json("No such food item to update")
            }
            else{
                res.status(200).json({
                    status:"Success",
                    message:`${table.TableNo} is updated `,
                    data:{
                        table
                    }
                });
            }
        }
        else{
            res.status(401).json({
                staus:"Error",
                message:"This user not authorized for this operation"
            })
        }
       
    }
    catch(error){
        res.status(500).json({
            status:"Server Error",
            message:"This user not authorized for this operation"
        });
    }
}

// Method : Get
// End Point : "api/v1/availabletables";
// Description : Get Available Tables
export const getAvailableTables = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const tables = await Table.find();
            let availableTables = [];
            if(tables !== null){
                tables.map(table=>{
                    if(table.Status === "Available"){
                        availableTables.push(table);
                    }
                })
                res.status(200).json({
                    status:"Success",
                    message:"Details of Available Tables",
                    data:{
                        availableTables
                    }
                })
            }
            else{
                res.status(404).json({message:"There are no any recordes please add tables"});
            }
        }
        else{
            res.status(401).json('Only Manager, Staff-Member & Admin have access to do this operation');
        }
    } catch (error) {
        res.status(500).json({
            status:"Server Error",
            message:error.message,
        })
    }
}