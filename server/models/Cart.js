import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    Foods:{
        type:mongoose.Schema.ObjectId,
        ref:'Foods'
    },
    Qty:{
        type:Number,
        required:true
    }
},
{
    toJSON: { 
        virtuals: true,
        // transform(doc,ret){
        //     delete ret.Password;
        //     delete ret.ConfirmPassword
        // }    
    },
    toObject: { virtuals: true },
    timestamps: true
});

const Cart = mongoose.model('Cart',CartSchema);

export default Cart;