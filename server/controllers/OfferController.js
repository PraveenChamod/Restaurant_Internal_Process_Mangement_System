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
        if(user.Role === "Staff-Member"){
            const {Foods,SpecialPrice} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingOffer = await Offers.findOne({SerialNo:SerialNumber});
            
            if(existingOffer !== null){
                res.status(501).json({message:`This offer is already added`});
            }else{
                const AddOffer = await Offers.create({
                    Foods:Foods,
                    SpecialPrice:SpecialPrice,                   
                    SerialNo:SerialNumber,
                    
                })
                res.json(AddOffer);
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
        if(user.Role === "Staff-Member" || user.Role === "Customer"){
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
        const {SerialNo} = req.params;
        const offer = await Offers.findOneAndUpdate({SerialNo:SerialNo},{
            ...req.body
        })
        if(!offer){
            res.status(404).json("No such offer to update")
        }
        res.status(200).json(offer);
       
    }
    catch(error){
        res.status(error.message);
    }
}

//Delete offers


export const  deleteOffers =async (req,res)=>{

    try{
         const user = req.user;
         if(user.Role==="Staff-Member"){
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
