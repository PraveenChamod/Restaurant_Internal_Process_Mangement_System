import express from "express";
import {
  addTableItems,
  image,
  getTableItems,
} from "../controllers/TableItemsController.js";

const TableItemRoutes = express.Router();

TableItemRoutes.route("/TableItem").post(
  image,
  addTableItems
);

TableItemRoutes.route("/TableItems").get(getTableItems);

export default TableItemRoutes;
