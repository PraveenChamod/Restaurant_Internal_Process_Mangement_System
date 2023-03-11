import express from 'express';
import { CheckOrderDetails, OrderItem, SendOrderConfrimation, ViewAllOrders, ViewOrder, ViewPendingOrders } from '../controllers/OrderController.js';


const OrderRoutes = express.Router();

OrderRoutes.route('/OrderItem').post(OrderItem);
OrderRoutes.route('/PendingOrders').get(ViewPendingOrders);
OrderRoutes.route('/Orders').get(ViewAllOrders);
OrderRoutes.route('/Order/:_id').get(ViewOrder);
OrderRoutes.route('/OrderConfirmation/:_id').post(SendOrderConfrimation);
OrderRoutes.route('/Deliverer/OrderDetails').get(CheckOrderDetails);

export default OrderRoutes; 