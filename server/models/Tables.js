import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    TableNo:{
        type:Selection,
        required:[true,"You must have select the table no"]
    },
    DateAndTime:{
        type:DataView,
        required:[true,"You must have provide the date & time"]
    },
    NoOfPersons:{
        type:Number,
        required:[true,"You must have provide the number of persons"]
    }
    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    });

    const Table = mongoose.model('Table',tableSchema);

export default  Table;