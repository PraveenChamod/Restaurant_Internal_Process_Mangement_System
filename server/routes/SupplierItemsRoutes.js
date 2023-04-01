import express from 'express';
import {SupplierItems, ViewAllSupplierItems } from '../controllers/SupplierItemsController.js';


const SupplierItemsRoutes = express.Router();

SupplierItemsRoutes.route('/SupplierItems').post(SupplierItems);
SupplierItemsRoutes.route('/SupplierItemsDetails').get(ViewAllSupplierItems);



export default SupplierItemsRoutes;  