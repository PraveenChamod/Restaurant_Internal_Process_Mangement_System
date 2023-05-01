import express from "express";
import {
  SupplierItems,
  ViewAllSupplierItems,
  ViewAllSupplierItemsById,
  ViewSupplierItemsofSupplier,
} from "../controllers/SupplierItemsController.js";

const SupplierItemsRoutes = express.Router();

SupplierItemsRoutes.route("/SupplierItems").post(SupplierItems);
SupplierItemsRoutes.route("/SupplierItemsDetails").get(ViewAllSupplierItems);
SupplierItemsRoutes.route("/SupplierItemsDetailsById/:id").get(
  ViewAllSupplierItemsById
);
SupplierItemsRoutes.route("/supplieritemsdetailsofsupplier").get(
  ViewSupplierItemsofSupplier
);

export default SupplierItemsRoutes;
