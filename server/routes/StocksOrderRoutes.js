import express from 'express';
import { addSupplierOrder , ViewSupplierOrder, ViewSupplierOrderById } from '../controllers/StocksOrderController.js';

const StocksOrderRoutes = express.Router();

StocksOrderRoutes.route('/AddSupplierOrder').post(addSupplierOrder);
StocksOrderRoutes.route('/ViewSupplierOrder').get(ViewSupplierOrder);
StocksOrderRoutes.route('/ViewSupplierOrderById/:id').get(ViewSupplierOrderById);

export default StocksOrderRoutes;