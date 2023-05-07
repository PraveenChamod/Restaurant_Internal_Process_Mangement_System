import mongoose from "mongoose";

const TableReservationSchema = mongoose.Schema(
  {
    Customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    Tables: [
      {
        table: {
          type: mongoose.Schema.ObjectId,
          ref: "Table",
        },
      },
    ],
    Date: {
      type: String,
      required: [true, "You must have provide the date"],
    },
    ArrivalTime: {
      type: String,
      required: [true, "You must have provide the arrival time"],
    },
    DepartureTime: {
      type: String,
      required: [true, "You must have provide the departure time"],
    },
    amount: {
      type: Number,
      require: true,
    },
    Type: {
      type: String,
      enum: {
        values: ["Dine-in", "Dating", "Special-Events"],
      },
      required:[true,"Select the type!"]
    },
    Status: {
      type: String,
      enum:{
        values:["Pending","Confirm"]
      },
      required: true,
      default: "Pending",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const TableReservation = mongoose.model(
  "TableReservation",
  TableReservationSchema
);

export default TableReservation;
