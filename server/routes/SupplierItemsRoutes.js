import express from 'express';
import { addSupplierOrder , ViewSupplierOrder, ViewSupplierOrderById } from '../controllers/OrderStocksController.js';

const SupplierItemsRoutes = express.Router();

SupplierItemsRoutes.route('/AddSupplierOrder').post(addSupplierOrder);
SupplierItemsRoutes.route('/ViewSupplierOrder').get(ViewSupplierOrder);
SupplierItemsRoutes.route('/ViewSupplierOrderById/:id').get(ViewSupplierOrderById);

export default SupplierItemsRoutes;