import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    Customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    Foods: [
      {
        food: {
          type: mongoose.Schema.ObjectId,
          ref: "Foods",
        },
        offer: {
          type: mongoose.Schema.ObjectId,
          ref: "Offers",
        },
        Quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    ServiceProvider: {
      type: mongoose.Schema.ObjectId,
      ref: "ServiceProvider",
    },
    Date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["Cash On Delivery", "Card Payments"],
        message: "Select One Payment Method",
      },
    },
    DeliveryStatus: {
      type: String,
      enum: {
        values: ["Delivered", "Not Delivered"],
      },
      default: "Not Delivered",
    },
    Type: {
      type: String,
      enum: {
        values: ["Online Order", "Outlet Order"],
      },
    },
    Status: {
      type: String,
      default: "Pending",
      required: true,
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

const Order = mongoose.model("Order", OrderSchema);

export default Order;
