import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
    TableNo:{
        type:String,
        required:[true,"You must have select the table no"],
        unique:true
    },
    NoOfPersons:{
        type:Number,
        required:[true,"You must have provide the maximum number of persons"]
    },
    price:{
        type:Number,
        required:[true,"You must provide the table reservation fee"]
    },
    Status:{
        type:String,
        required:true,
        default:'Available'
    }
    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    });

    const Table = mongoose.model('Table',tableSchema);

    // setInterval(() => {
    //     const timeThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // Delete documents older than 24 hours
      
    //     Offers.deleteMany({ createdAt: { $lt: timeThreshold } }, (err) => {
    //       if (err) {
    //         console.error(err);
    //       } else {
    //         console.log('Old documents deleted');
    //       }
    //     });
    //   }, 60 * 60 * 1000);

export default  Table;