import mongoose from "mongoose";

const TableReservationSchema = mongoose.Schema({
    Customer:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer',
    },
    Table:{
        type:mongoose.Schema.ObjectId,
        ref:'Table',
    },
    Date:{
        type:String,
        required:[true,"You must have provide the date"]
    },
    Time:{
        type:String,
        required:[true,"You must have provide the time"]
    },
    NoOfPersons:{
        type:Number,
        required:[true,"You must provide the no of persons"]
    },
    amount:{
        type:Number,
        require:true
    },
    Status:{
        type:String,
        required:true,
        default:'Pending'
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

const TableReservation = mongoose.model('TableReservation',TableReservationSchema);

export default TableReservation;