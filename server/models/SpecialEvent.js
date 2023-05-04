import mongoose from "mongoose";

const SpecialEventSchema = mongoose.Schema(
  {
    EventName: {
      type: String,
    },
    Item1: {
      type: String,
    },
    Item2: {
      type: String,
    },
    Item3: {
      type: String,
    },
    BronzePrice: {
      type: Number,
    },
    SilverPrice: {
      type: Number,
    },
    GoldPrice: {
      type: Number,
    },
    SerialNo: {
        type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const SpecialEvent = mongoose.model("SpecialEvent", SpecialEventSchema);

export default SpecialEvent;
