import mongoose from "mongoose";
const TransactionSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    },
    Order:{
        type:mongoose.Schema.ObjectId,
        ref:'Order',
    }
})

const Transaction = mongoose.model('Transaction',TransactionSchema)

export default Transaction;