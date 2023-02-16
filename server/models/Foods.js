import mongoose from "mongoose";

const FoodsSchema = mongoose.Schema({
    FoodName:{
        type:String,
        required:[true,"Please Select the Item"]
    },
    Quantity:{
        type:String,
        required:[true,"Must Provide the available no of item"]
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
    Category:{
        type:String,
        required:[true,"Please Select the category"]
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