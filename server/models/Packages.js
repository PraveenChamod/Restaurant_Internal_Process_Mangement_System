import mongoose from "mongoose";

const PackagesSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Items: [
      {
        item: {
          type: mongoose.Schema.ObjectId,
          ref: "TableItem",
        },
      },
    ],
    Price: {
      type: Number,
      required: [true, "Please enter the price"],
    },
    Type: {
      type: String,
      required: [true, "Please enter the event name"],
    },
    Status: {
      type: String,
      enum: {
        values: ["Available", "Not Available"],
      },
      required: true,
      default: "Available",
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

const Package = mongoose.model("Package", PackagesSchema);

export default Package;
