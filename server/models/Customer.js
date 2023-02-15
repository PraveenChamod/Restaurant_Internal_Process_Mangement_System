import mongoose from "mongoose";
import validator from "validator";
const customerSchema = mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Customer must have a name"]
    },
    Password:{
        type:String,
        required:[true,"Customer must have enter the password"],
        minlength:8,
        unique:true,
    },
    ConfirmPassword:{
        type:String,
        required:[true,"Customer must confirm the password"],
        select: false,
        validate:{
            validator:function(pwd){
                return this.Password === pwd
            },
            message:"Password doesn't match"
        }
    },
    ContactNumber:{
        type:Number,
        required:[true,"User must provide his/her contact number"],
        maxlength:10,
    },
    Email:{
        type:String,
        required:[true,"Customer must have to enter the email"],
        unique:true,
        validate:{
            validator:function(val){
                return validator.isEmail(val)
            },
            message:"Please enter the valid email"
        },
        immutable:true
    },
    Role:{
        type:String,
        default: 'Customer',
        enum:{
            values:['Customer'],
            message: "Cannot allow to  change the role of customer to any other role."
        },
        immutable:true
    },
    ProfileImage:{
        type:String,
    },
    OTP:{
        type:Number
    },
    OTP_Expire:{
        type:Date
    },
    lat:{
        type:Number
    },
    lang:{
        type:Number
    },
    cart: [
        {
            item: { type: mongoose.Schema.ObjectId, ref: 'Foods', require: true},
            unit: { type: Number, require: true}
        }
    ],
    // orders: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Order'
    // }],
    OrderFoods:{
        type:Boolean,
        default:false
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
    

const Customer = mongoose.model('Customer',customerSchema);

export default Customer;