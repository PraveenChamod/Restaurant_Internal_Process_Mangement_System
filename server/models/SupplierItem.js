import mongoose  from "mongoose";

const SupplierItemSchema = mongoose.Schema({
    Items:{
        type:String,
        required:true
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