import mongoose from "mongoose";

const TableItemSchema = mongoose.Schema(
  {
    ItemName: {
      type: String,
    },
    ItemType: {
      type: String,
    },
    ItemPrice: {
      type: Number,
    },
    TableItemImage: {
      type: String,
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

const TableItem = mongoose.model(
  "TableItem",
  TableItemSchema
);

export default TableItem;
