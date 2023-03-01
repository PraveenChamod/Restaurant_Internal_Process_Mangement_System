import mongoose from "mongoose";

const FoodsSchema = mongoose.Schema({
    FoodName:{
        type:String,
        required:[true,"Please Select the Item"]
    },
    Price:{
        type:Number,
        required:[true,"Must Add the Unit Price"]
    },
    SerialNo:{
        type:String,
        required:[true,"Serial No Must Be Add"]
    },
    FoodImage:{
        type:String,
        required:[true,"Must Upload Image"]
    },
    Status:{
        type:String,
        default:'Available'
    },
    OrderItems:{
        type:Boolean,
        default:false
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

const Foods = mongoose.model('Foods',FoodsSchema);

export default Foods;