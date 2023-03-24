import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import TableReservation from "../models/TableReservation.js";
import Table from "../models/Tables.js";

// Method : POST
// End Point : "api/v1/TableReservation";
// Description : Reserve Table
export const ReserveTable = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const logedCustomer = await Customer.findOne({Email:user.Email}).populate('Email');
            const session = await mongoose.startSession();
                // console.log(session);
                try {
                    session.startTransaction();
                    req.body.TableNo.forEach(async (table) => {
                        const findTable = await Table.findOne({TableNo:table}).populate('TableNo');
                        const updateTable = await Table.findByIdAndUpdate(findTable._id,{Status:"Reserved"},{new:true,runValidators:true}).session(session);
                    });
                    const newReservation = await TableReservation.create([
                        req.body
                    ],{session});
                    const commit = await session.commitTransaction();
                    session.endSession();
                
                    res.status(201).json({
                        status: 'success',
                        message: 'Reservation is successfull',
                        data: {
                            newReservation
                        }
                    })
                } catch (error) {
                    res.status(400).json({
                        status:'Error',
                        message:error.message
                    });
                }
        }
    } catch (error) {
        res.status(500).json({
            status:'Server Error',
            message:error.message
        });
    }
}

// Method : GET
// End Point : "api/v1/PendingReservations";
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
// End Point : "api/v1/Reservation/:_id";
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
// End Point : "api/v1/ReservationConfirmation/:_id";
// Description : Confirm Reservation
export const SendReservationConfirmation = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member"){
            const {_id} = req.params;
            const findReservation = await TableReservation.findById(_id);
            console.log(findReservation);
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
            }else{
                res.status(404).json({
                    status: 'Not Found',
                    message: 'There are no any reservation available related to given id',
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: 'Server Error',
            message: error.message,
        });
    }
}
