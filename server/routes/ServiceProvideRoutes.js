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
ServiceProviderrouter.route('/Staff-Member/food/updateFood/:SerialNo').post(updateFood);
ServiceProviderrouter.route('/Staff-Member/food/deleteFood/:SerialNo').post(deleteFoods);

//Offer routes
ServiceProviderrouter.route('/Staff-Member/offer/addOffer').post(addOffer);
ServiceProviderrouter.route('/Staff-Member/offer/getOffer').get(getOffers);
ServiceProviderrouter.route('/Staff-Member/offer/updateOffer').post(updateOffer);
ServiceProviderrouter.route('/Staff-Member/offer/deleteOffer').post(deleteOffers);

export default ServiceProviderrouter;