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
      required: [true, "Select the type!"],
    },
    Status: {
      type: String,
      enum: {
        values: ["Pending", "Reserved"],
      },
      required: true,
      default: "Pending",
    },
    Items: [{
      type: mongoose.Schema.ObjectId,
      ref: "TableItem",
    }],
    Package: {
      type: mongoose.Schema.ObjectId,
      ref: "Package",
    },
    eventName:{
      type:String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

TableReservationSchema.pre("save", function (next) {
  if (this.Type == "Special Events" || this.Type == "Dine-in") {
    this.Items = undefined;
  }
  if (!this.Type == "Dating" || this.Type == "Dine-in") {
    this.Package = undefined;
  }
  next();
});

const TableReservation = mongoose.model(
  "TableReservation",
  TableReservationSchema
);

export default TableReservation;
