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
        select: false,
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
    Address:{
        type:String,
        required:[true,"User must provide his/her current location"],
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