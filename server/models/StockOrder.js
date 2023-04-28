import mongoose  from "mongoose";

const StocksOrderSchema = mongoose.Schema({
    Order:[
        {
            Supplier:{
                type:mongoose.Schema.ObjectId,
                ref:'ServiceProvider'
            },
            Items:[
                {
                    item:{
                        type:mongoose.Schema.ObjectId,
                        ref:'SupplierItem',
                    },
                    Quantity:{
                        type:Number,
                        default:1,
                        required:[true,"Must provide the quantity"]
                    },
                }
            ],
        }
    ],
    Manager:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider'
    },
    TotalPrice:{
        type:Number
    },
    Status:{
        type:String,
        default:'Pending',
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

const StocksOrder = mongoose.model('StocksOrder',StocksOrderSchema);

export default StocksOrder;