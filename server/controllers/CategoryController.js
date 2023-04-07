import multer from "multer";
import CategoryModel from "../models/Category.js";

const imageStorage = multer.diskStorage({
    destination:"images/Categories",
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})

export const image = multer({storage:imageStorage}).single('image');

// Method : POST
// End Point : "api/v1/Category";
// Description : Add Category

export const addCategories = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === 'Manager' || user.Role === 'Admin'){
            const {Category} = req.body;
            console.log(Category);
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+98*100);
            const existingCategory = await CategoryModel.findOne({SerialNo:SerialNumber});
            if(existingCategory !== null){
                res.status(501).json({message:`This item is already added`});
            }else{
                const AddCategories = await CategoryModel.create({
                    SerialNo:SerialNumber,
                    CategoryName:Category,
                    CategoryImage:req.file.filename
                })
                res.status(200).json({
                    status: 'success',
                    message:"Added new category",
                    data:{
                        AddCategories
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