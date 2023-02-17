import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    
    Rate:{
        type:Number,
       
        required:[true,"Please Select the rate"]
    },
    Review:{
        type:String,
        default:null,
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

const Review = mongoose.model('Revieww',ReviewSchema);

export default Review;
