import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import Reviews from "../models/Reviews.js";

// Method : POST
// End Point : "api/v1/Blogs";
// Description : Add Review
export const AddReview = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Customer"){
            const {Review,Rate} = req.body;
                const session = await mongoose.startSession();
                const customer = await Customer.findOne({Email:user.Email});
                // console.log(session);
                try {
                    session.startTransaction();
                    const ReviewData = {Customer:customer.id,Review:Review,Rate:Rate}
                    const newreview = await Reviews.create([ReviewData],{session});
                    const commit = await session.commitTransaction();
                    session.endSession();
                
                    res.status(201).json({
                        status: 'success',
                        message: 'Submitted Review successfully',
                        data:{
                            newreview
                        }
                    })
                } catch (error) {
                    res.status(500).json(error.message);
                }
                // return res.json(review);
            
        }   
        else{
            res.json({message:"You are not a Customer"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error.message);
    }
}