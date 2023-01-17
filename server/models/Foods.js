import mongoose from "mongoose";

const FoodsSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
    },
    FoodName:{
        type:String,
        required:[true,"Please Select the Item"]
    },
    Quantity:{
        type:String,
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
        required:[true,"Please Upload the image of the food"]
    },
    Category:{
        type:String,
        required:[true,"Please Select the category"]
    }

});

const Foods = mongoose.model('Foods',FoodsSchema);

export default Foods;