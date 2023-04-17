import multer from "multer";
import DatingTableItemModel from "../models/DatingTableItem.js";

const imageStorage = multer.diskStorage({
    destination:"images/DatingTableItems",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})

export const image = multer({storage:imageStorage}).single('image');


// Method : POST
// End Point : "api/v1/DatingTableItem";
// Description : Add DatingTableItem

export const addDatingTableItems = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === 'Manager' || user.Role === 'Admin'){
            const {ItemName, ItemPrice} = req.body;
            console.log(ItemName);
            console.log(ItemPrice);
            const SerialNumber =  ItemName.slice(0,2).toUpperCase() + Math.floor(100+98*100);
            const existingDatingTableItem = await DatingTableItemModel.findOne({SerialNo:SerialNumber});
            if(existingDatingTableItem !== null){
                res.status(501).json({message:`This item is already added`});
            }else{
                const AddDatingTableItems = await DatingTableItemModel.create({
                    SerialNo:SerialNumber,
                    ItemName:ItemName,
                    ItemPrice:ItemPrice,
                    DatingTableItemImage:req.file.filename
                })
                res.status(200).json({
                    status: 'success',
                    message:"Added New Dating Table Item",
                    data:{
                        AddDatingTableItems
                    }
                });
            }
        }
        else{
            res.status(401).json({
                status:"Error",
                message:"This user dosen't has authorization to do this operation"
            });
        }
    } catch (error) {
        res.status(501).json({
            status:"Server Error",
            message:error.message
        });
    }
}