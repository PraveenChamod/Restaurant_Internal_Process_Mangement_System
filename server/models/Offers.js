import mongoose from "mongoose";

const offerSchema = mongoose.Schema(
  {
    SpecialPrice: {
      type: Number,
      required: [true, "Add Price of the offer"],
    },
    OfferName: {
      type: String,
      required: [true, "Add Offer Name"],
    },
    SerialNo: {
      type: String,
      required: [true, "Serial Number Must Be Add"],
    },
    Validity: {
      type: Date,
      default: Date.now,
    },
    Category: {
      type: String,
    },
    OfferImage: {
      type: String,
    },
    Status: {
      type: String,
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
    timestamps: true,
  }
);

const Offers = mongoose.model("Offers", offerSchema);

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

export default Offers;
