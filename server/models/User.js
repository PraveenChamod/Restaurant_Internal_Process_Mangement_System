import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema({
    Name:{
        type:String,
    },
    Password:{
        type:String,
        required:[true,"User must have to enter the password"],
        minlength: 8,
        unique:true,
        
    },
    ContactNumber:{
        type:Number,
        maxlength:10,
    },
    Address:{
        type:String,
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
            values:['Customer','Manager','Staff-Member','Deliverer','Supplier','Admin'],
            message:"User role must be one of : ['Customer','Manager','Staff-Member','Deliverer','Supplier','Admin']"
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

const User = mongoose.model('User',UserSchema);

export default User;