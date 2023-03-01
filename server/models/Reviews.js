import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    Rate:{
        type:Number,
    },
    Review:{
        type:String,
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

const Reviews = mongoose.model('Review',ReviewSchema);

export default Reviews;
