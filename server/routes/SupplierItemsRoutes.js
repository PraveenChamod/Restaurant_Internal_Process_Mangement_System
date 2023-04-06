import express from 'express';
import {SupplierItems, ViewAllSupplierItems, ViewAllSupplierItemsById } from '../controllers/SupplierItemsController.js';


const SupplierItemsRoutes = express.Router();

SupplierItemsRoutes.route('/SupplierItems').post(SupplierItems);
SupplierItemsRoutes.route('/SupplierItemsDetails').get(ViewAllSupplierItems);
SupplierItemsRoutes.route('/SupplierItemsDetailsById/:id').get(ViewAllSupplierItemsById);

export default SupplierItemsRoutes;  