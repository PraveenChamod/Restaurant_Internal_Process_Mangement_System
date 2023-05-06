import mongoose from "mongoose";

const FoodsSchema = mongoose.Schema(
  {
    FoodName: {
      type: String,
    },
    Price: {
      type: Number,
    },
    SerialNo: {
      type: String,
    },
    FoodImage: {
      type: String,
    },
    Status: {
      type: String,
      enum:{
        values:["Available","Not Available"]
      },
      required: true,
      default: "Available",
    },
    Category: {
      type: String,
    },
    OrderItems: {
      type: Boolean,
      default: false,
    },
    Qty: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Foods = mongoose.model("Foods", FoodsSchema);

export default Foods;
