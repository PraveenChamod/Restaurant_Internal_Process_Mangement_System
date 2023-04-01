import ServiceProviders from "../models/ServiceProviders.js";
import SupplierItem from "../models/SupplierItem.js";

// Method : POST
// End Point : "api/v1/AddSupplierOrder";
// Description : Add Supplier Order Item

export const addSupplierOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {Item,Quantity,Email} = req.body;
            const supplier = await ServiceProviders.findOne({Email:Email}).populate('Email');
            const neworder = await SupplierItem.create({
                Items:Item,
                Quantity:Quantity,
                Supplier:supplier.id
            })
                res.status(201).json({
                    status:'Success',
                    message:'A New supplier order is Added',
                    data:{
                        neworder
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

// Method : Get
// End Point : "api/v1/ViewSupplierOrder";
// Description : Get supplier order

export const ViewSupplierOrder = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager" || user.Role === "Supplier" ){
            const tables = await SupplierItem.find();
            if(tables !== null){
                res.json(tables);
            }
            else{
                res.status(404).json({message:"There are no any recordes please add tables"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

export const ViewReceivedOrders = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Supplier"){
            const findItems = await SupplierItem.find(); //model eka change karaganna
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


// Method : GET
// End Point : "api/v1/ViewSupplierOrderById/:id'"
// Description : Get SupplierOrder By Id
export const ViewSupplierOrderById = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {id} = req.params;
            const findSupplierItem = await SupplierItem.findById(id);
            if(findSupplierItem){
                res.status(200).json({
                    status:"Success",
                    message:`Details of ${findSupplierItem.Items.Itemname}`,
                    data:{
                        findSupplierItem
                    } 
                })
            }
            else{
                res.status(404).json({
                    status: 'Error',
                    message: 'SupplierItem is not found',
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status:'Server Error',
            message:error.message,
        });
    }
}