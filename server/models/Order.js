import mongoose  from "mongoose";

const OrderSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    Item:{
        type:mongoose.Schema.ObjectId,
        ref:'Item'
    },
    Date:{
        type:Date,
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

const Order = mongoose.model('Order',OrderSchema);

export default Order;