import mongoose from "mongoose";

const SupplierItemSchema = mongoose.Schema(
  {
    Items: [
      {
        ItemName: {
          type: String,
          required: [true, "Must Provide the Name"],
        },
        Price: {
          type: Number,
          required: [true, "Must Provide Price Of the Item"],
        },
        Status: {
          type: String,
          enum: {
            values: ["Available", "Out of Stock"],
          },
          default: "Available",
        },
        Category: {
          type: String,
          required: [true, "Must Provide the Category"],
        },
      },
    ],
    Supplier: {
      type: mongoose.Schema.ObjectId,
      ref: "ServiceProvider",
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

const SupplierItem = mongoose.model("SupplierItem", SupplierItemSchema);

export default SupplierItem;
