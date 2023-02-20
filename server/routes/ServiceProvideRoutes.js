import express from 'express';
import * as l  from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ServiceProviderrouter.route('/RegisterOutletStaff').post(l.RegisterOutletStaff);
ServiceProviderrouter.route('/AddItems').post(l.addItems);
ServiceProviderrouter.route('/getItems').get(l.getItems);
ServiceProviderrouter.route('/getItemsByCategory').get(l.getItemByCategory);
ServiceProviderrouter.route('/deleteItemBySerialNo/:SerialNo').delete(l.deleteItemBySerialNo);

//Food routes
ServiceProviderrouter.route('/food/AddFoods').post(l.addFoods);
ServiceProviderrouter.route('/food/getFoods').get(l.getFoods);
ServiceProviderrouter.route('/food/getFoodsbyCategory').get(l.getFoodByCategory);
ServiceProviderrouter.route('/food/updateFood/:SerialNo').post(l.updateFood);
ServiceProviderrouter.route('/food/deleteFood/:SerialNo').post(l.deleteFoods);

//Offer routes
ServiceProviderrouter.route('/offer/addOffer').post(l.addOffer);
ServiceProviderrouter.route('/offer/getOffer').get(l.getOffers);
ServiceProviderrouter.route('/offer/updateOffer').post(l.updateOffer);
ServiceProviderrouter.route('/offer/deleteOffer').post(l.deleteOffers);

//Tables CRUD
ServiceProviderrouter.route('/Tables/AddTable').post(l.AddTable);
//Order Handling
ServiceProviderrouter.route('/Orders/PendingOrders').get(l.ViewPendingOrders);
ServiceProviderrouter.route('/Orders/ViewOrder/:_id').get(l.ViewOrder);
ServiceProviderrouter.route('/Orders/getDeliverers').get(l.getAvailableDeliverers);
ServiceProviderrouter.route('/Orders/ConfirmOrder/:_id').post(l.SendOrderConfrimation);

//Table Reservation Handling
ServiceProviderrouter.route('/Reservations/PendingReservations').get(l.ViewPendingReservations);
ServiceProviderrouter.route('/Reservations/ViewReservation/:_id').get(l.ViewReservation);
ServiceProviderrouter.route('/Reservations/ConfirmReservation/:_id').post(l.SendReservationConfirmation);

//Deliverer Order Handling
ServiceProviderrouter.route('/Deliverer/ViewOrderDetails').get(l.CheckOrderDetails);
export default ServiceProviderrouter;