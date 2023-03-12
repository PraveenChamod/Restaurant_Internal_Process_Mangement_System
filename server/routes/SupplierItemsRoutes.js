import express from 'express';
import { addSupplierOrder , ViewSupplierOrder } from '../controllers/OrderStocksController.js';

const SupplierItemsRoutes = express.Router();

SupplierItemsRoutes.route('/SupplierOrder').post(addSupplierOrder);
SupplierItemsRoutes.route('/SupplierOrder').get(ViewSupplierOrder);

export default SupplierItemsRoutes;