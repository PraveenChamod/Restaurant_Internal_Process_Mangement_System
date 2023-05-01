import express from "express";
import {
  addItems,
  deleteItemBySerialNo,
  getItemByCategory,
  getItemBySerialNo,
  getItems,
  updateItem,
} from "../controllers/ItemsControll.js";

const ItemsRoutes = express.Router();

ItemsRoutes.route("/Item").post(addItems);
ItemsRoutes.route("/Items").get(getItems);
ItemsRoutes.route("/Item/:SerialNo").get(getItemBySerialNo);
ItemsRoutes.route("/Item/:SerialNo").patch(updateItem);
ItemsRoutes.route("/Items/:Category").get(getItemByCategory);
ItemsRoutes.route("/Item/:SerialNo").delete(deleteItemBySerialNo);

export default ItemsRoutes;
