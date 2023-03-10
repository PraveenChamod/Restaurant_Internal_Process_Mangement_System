import Item from "../models/Items.js";

// Method : POST
// End Point : "api/v1/Item";
// Description : Add Items

export const addItems = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {ItemName,Quantity,UnitPrice,WholeSalePrice,Category} = req.body;
            const SerialNumber =  Category.slice(0,2).toUpperCase() + Math.floor(100+Math.random()*1000);
            const existingItem = await Item.findOne({SerialNo:SerialNumber});
            if(existingItem !== null){
                res.json({message:"This food is already added"});
            }
            else{
                const createItem = await Item.create({
                    SerialNo:SerialNumber,
                    ItemName:ItemName,
                    Category:Category,
                    WholeSalePrice:WholeSalePrice,
                    Quantity:Quantity,
                    UnitPrice:UnitPrice,
                })
                res.json(createItem);
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}
// Method : GET
// End Point : "api/v1/Items";
// Description : Get Items

export const getItems = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const items = await Item.find();
            if(items !== null){
                res.json(items);
            }
            else{
                res.status(404).json({message:"There are no any recordes please add items"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : GET
// End Point : "api/v1/Items/:category";
// Description : Get Items By Category

export const getItemByCategory = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {Category} = req.params;
            const findItems = await Item.find({Category:Category}).populate('Category');
            if(findItems !== null){
                let Items = [];
                findItems.map(Item=>{
                    if(Item.Category === Category){
                        Items.push(Item);
                    }
                })
                res.json(Items);
            }
            else{
                res.json({message:"Category dosen't exist"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}

// Method : DELETE
// End Point : "api/v1/Items/:id;
// Description : Get Foods By Category

export const deleteItemBySerialNo = async (req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {SerialNo} = req.params;
            const existItem = await Item.findOne({SerialNo:SerialNo});
            console.log(existItem);
            if(Item !== null){
                await Item.findByIdAndRemove(existItem._id);
                res.json({message:`${SerialNo} item Removed`});
            }
            else{
                res.status(404).json({message:"Food doesn't found, Please enter valid serail no"});
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}
