import mongoose  from "mongoose";

const OrderSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    Foods:[{
            food:{
                type:mongoose.Schema.ObjectId,
                ref:'Foods'
            },
            Quantity:{
                type:Number,
                default:1
            }
        }],
    ServiceProvider:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProviders'
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    TotalPrice:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:{
            values:['Cash On Delivery','Card Payments'],
            message:"Select One Payment Method"
        },
        required:[true,"Please Select the Payment Method"]
    },
    Status:{
        type:String,
        default:'Pending',
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