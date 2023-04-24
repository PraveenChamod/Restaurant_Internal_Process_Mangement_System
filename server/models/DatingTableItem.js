import mongoose from "mongoose";

const DatingTableItemSchema = mongoose.Schema({
    ItemName:{
        type:String,
    },
    ItemType:{
        type:String,
    },
    ItemPrice:{
        type:Number,
    },
    DatingTableItemImage:{
        type:String,
    },
    SerialNo:{
        type:String,
    },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

const DatingTableItem = mongoose.model('DatingTableItem',DatingTableItemSchema);

export default DatingTableItem;