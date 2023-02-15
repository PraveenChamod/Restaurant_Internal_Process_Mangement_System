import mongoose from "mongoose";
import validator from "validator";

const serviceProvidersSchema = mongoose.Schema({
    Order:{
        type:mongoose.Schema.ObjectId,
        ref:'Order'
    },
    Name:{
        type:String,
    },
    Password:{
        type:String,
        required:[true,"User must have to enter the password"],
        minlength: 8,
        select: false,
        unique:true,
    },
    ContactNumber:{
        type:Number,
        maxlength:10,
    },
    ConfirmPassword:{
        type:String,
        select: false,
        validate:{
            validator:function(pwd){
                return this.Password === pwd
            },
            message:"Password doesn't match"
        }
    },
    Email:{
        type:String,
        required:[true,"User must have to enter the email"],
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
        required:true,
        enum:{
            values:['Manager','Staff-Member','Deliverer','Supplier','Admin'],
            message:"User role must be one of : ['Manager','Staff-Member','Deliverer','Supplier','Admin']"
        },
        immutable:true
    },
    ProfileImage:{
        type:String,
    }
    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    });

    const ServiceProviders = mongoose.model('ServiceProvider', serviceProvidersSchema);

 export default ServiceProviders;