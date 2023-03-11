import express from 'express';
import { addSupplierOrder , ViewSupplierOrder } from '../controllers/OrderStocksController.js';

const SupplierItemsRoutes = express.Router();

SupplierItemsRoutes.route('/AddSupplierOrder').post(addSupplierOrder);
SupplierItemsRoutes.route('/ViewSupplierOrder').get(ViewSupplierOrder);

export default SupplierItemsRoutes;