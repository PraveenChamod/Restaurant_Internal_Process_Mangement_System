import express from 'express';
import { addItems, deleteItemBySerialNo, getItems, getItemByCategory, RegisterOutletStaff, addFoods, getFoods, getFoodByCategory, updateFood, deleteFoods, addOffer, getOffers, updateOffer, deleteOffers } from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ServiceProviderrouter.route('/RegisterOutletStaff').post(RegisterOutletStaff);

ServiceProviderrouter.route('/AddItems').post(addItems);

ServiceProviderrouter.route('/getItems').get(getItems);

ServiceProviderrouter.route('/getItemsByCategory').get(getItemByCategory);

ServiceProviderrouter.route('/deleteItemBySerialNo/:SerialNo').delete(deleteItemBySerialNo);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Staff-Member++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Food routes
ServiceProviderrouter.route('/Staff-Member/food/AddFoods').post(addFoods);
ServiceProviderrouter.route('/Staff-Member/food/getFoods').get(getFoods);
ServiceProviderrouter.route('/Staff-Member/food/getFoodsbyCategory').get(getFoodByCategory);
ServiceProviderrouter.route('/Staff-Member/food/updateFood/:SerialNo').get(updateFood);
ServiceProviderrouter.route('/Staff-Member/food/deleteFood/:SerialNo').get(deleteFoods);

//Offer routes
ServiceProviderrouter.route('/Staff-Member/offer/addOffer').get(addOffer);
ServiceProviderrouter.route('/Staff-Member/offer/getOffer').get(getOffers);
ServiceProviderrouter.route('/Staff-Member/offer/updateOffer').get(updateOffer);
ServiceProviderrouter.route('/Staff-Member/offer/deleteOffer').get(deleteOffers);

export default ServiceProviderrouter;