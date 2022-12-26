import mongoose from "mongoose";


const itemSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    ItemName:{
        type:String,
        require:[true,"Must provide th item name"]
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
        type:Float32Array,
        required:[true,"Must provide the unit price of the selected item"]
    },
    TotalPrice:{
        type:Float32Array,
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