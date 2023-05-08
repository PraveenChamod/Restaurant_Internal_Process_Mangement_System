import mongoose from "mongoose";

const SpecialEventSchema = mongoose.Schema(
  {
    EventName: {
      type: String,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const SpecialEvent = mongoose.model("SpecialEvent", SpecialEventSchema);

export default SpecialEvent;
