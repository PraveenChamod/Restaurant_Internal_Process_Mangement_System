import mongoose from "mongoose";
import multer from "multer";
import Offers from "../models/Offers.js";


const imageStorage = multer.diskStorage({
    destination:"images/Offers",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
export const image = multer({storage:imageStorage}).single('image');
export const addOffer  = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Staff-Member" || user.Role === "Manager"){
            const {Category,SpecialPrice} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingOffer = await Offers.findOne({SerialNo:SerialNumber});
            if(existingOffer !== null){
                res.status(401).json({message:`This offer is already added`});
            }else{
                const session = await mongoose.startSession();
                try {
                    session.startTransaction();
                    const OfferData = {SpecialPrice:SpecialPrice,SerialNo:SerialNumber,Category:Category,OfferImage:req.file.filename}
                    const NewOffer = await Offers.create([OfferData],{session});
                    const commit = await session.commitTransaction();
                    session.endSession();
                    res.status(201).json({
                        status: 'success',
                        message: 'Offer Added successfully',
                        data: {
                            NewOffer
                        }
                    })
                } catch (error) {
                    res.status(500).json(error.message);
                }
            }
        }
        else{
            res.status(501).json("This user dosen't has authorization to do this operation");
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

//View Offers
export const getOffers = async (req,res)=>{

    try {
        const user = req.user;
        if(user.Role === "Staff-Member" || user.Role === "Customer" || user.Role === "Manager"){
            const offers = await Offers.find();
            if(offers !== null){
                res.json(offers);
            }
            else{
                res.status(404).json({message:"No offers found."});
            }
        }
        else{
            res.status(401).json('Only Staff member has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

//Update offers
export const updateOffer = async(req,res)=>{
    try{
        const user = req.user;
        if(user.Role === 'Staff-Member' || user.Role === "Manager"){
            const {SerialNo} = req.params;
            const offer = await Offers.findOneAndUpdate({SerialNo:SerialNo},{
                ...req.body
            },{new:true}).populate('SerialNo');
            if(!offer){
                res.status(404).json("No such offer to update")
            }
            res.status(200).json({
                status:"Success",
                message:`${offer.SerialNo} is updated `,
                data:{
                    offer
                }
            });
        }       
    }
    catch(error){
        res.status(error.message);
    }
}

//Delete offers


export const  deleteOffers =async (req,res)=>{

    try{
         const user = req.user;
         if(user.Role==="Staff-Member" || user.Role === "Manager"){
            const {SerialNo} = req.params;
            const offer = await Offers.findOne({SerialNo:SerialNo});
            if(offer !== null){
                await Offers.findByIdAndRemove(offer._id);
                res.json({message:`${SerialNo} Offer Removed`});
            }
            else{
                res.status(404).json({message:"Offer doesn't found, Please enter valid serail no"});
            }
         }else{
            res.status(501).json("This user not authorized for this operation")
         }

    }catch(error){
        res.status(501).json(error.message);

    }
   
}
