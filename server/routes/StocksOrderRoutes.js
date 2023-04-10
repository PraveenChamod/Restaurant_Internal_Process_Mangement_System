import express from 'express';
import { addSupplierOrder , ConfirmStockOrder, ViewSupplierOrder, ViewSupplierOrderById } from '../controllers/StocksOrderController.js';

const StocksOrderRoutes = express.Router();

StocksOrderRoutes.route('/SupplierOrder').post(addSupplierOrder);
StocksOrderRoutes.route('/SupplierOrder').get(ViewSupplierOrder);
StocksOrderRoutes.route('/stockorderbyid/:id').get(ViewSupplierOrderById);
StocksOrderRoutes.route('/stockorderconfirmation/:id').post(ConfirmStockOrder);

export default StocksOrderRoutes;