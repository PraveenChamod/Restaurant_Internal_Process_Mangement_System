import mongoose from "mongoose";


const itemSchema = mongoose.Schema({
    ItemName:{
        type:String,
        require:[true,"Must provide th item name"]
    },
    Category:{
        type:String,
        require:[true,"Must provide the category"]
    },
    SerialNo:{
        type:String,
        require:[true,"Must provide serial no"],
        unique:true
    },
    Quantity:{
        type:Number,
        required:[true,"Must provide the quantiy of the selected item"]
    },
    UnitPrice:{
        type:Number,
        required:[true,"Must provide the unit price of the selected item"]
    },
    WholeSalePrice:{
        type:Number,
        required:[true,"Must provide the wholesale price"]
    },
    TotalPrice:{
        type:Number,
        required:[true,"Must provide the unit price of the selected item"]
    }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    });

const Item = mongoose.model('Item', itemSchema);

export default Item;