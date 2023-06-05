import mongoose from "mongoose";

const StocksOrderSchema = mongoose.Schema(
  {
    Order: [
      {
        Supplier: {
          type: mongoose.Schema.ObjectId,
          ref: "ServiceProvider",
        },
        Items: [
          {
            id: {
              type: mongoose.Schema.ObjectId,
              ref: "SupplierItem",
            },
            item: {
              type: String,
              required: [true, "Must Have Item Id"],
            },
            Quantity: {
              type: Number,
              default: 1,
              required: [true, "Must provide the quantity"],
            },
          },
        ],
        Status: {
          type: String,
          enum:{
            values:["Pending","Confirm"]
          },
          required: true,
          default: "Pending",
        },
      },
    ],
    Manager: {
      type: mongoose.Schema.ObjectId,
      ref: "ServiceProvider",
    },
    TotalPrice: {
      type: Number,
    },
    Date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const StocksOrder = mongoose.model("StocksOrder", StocksOrderSchema);

export default StocksOrder;
