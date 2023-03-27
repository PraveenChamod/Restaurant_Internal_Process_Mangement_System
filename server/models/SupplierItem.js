import mongoose  from "mongoose";

const SupplierItemSchema = mongoose.Schema({
    Items:{
        type:mongoose.Schema.ObjectId,
        ref:'Item',
    },
    Quantity:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    Supplier:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider',
    }
},
{
    toJSON: { 
        virtuals: true,
    },
    toObject: { virtuals: true },
    timestamps: true
});

const SupplierItem = mongoose.model('SupplierItem',SupplierItemSchema);

export default SupplierItem;