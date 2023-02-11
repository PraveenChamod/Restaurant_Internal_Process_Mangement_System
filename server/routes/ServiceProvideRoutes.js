import express from 'express';
import { addItems, deleteItemBySerialNo, getItems, getItemByCategory, RegisterOutletStaff, addFoods, getFoods, getFoodByCategory, updateFood, deleteFoods, addOffer, getOffers, updateOffer, deleteOffers } from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ServiceProviderrouter.route('/RegisterOutletStaff').post(RegisterOutletStaff);
ServiceProviderrouter.route('/AddItems').post(addItems);
ServiceProviderrouter.route('/getItems').get(getItems);
ServiceProviderrouter.route('/getItemsByCategory').get(getItemByCategory);
ServiceProviderrouter.route('/deleteItemBySerialNo/:SerialNo').delete(deleteItemBySerialNo);

//Food routes
ServiceProviderrouter.route('/food/AddFoods').post(addFoods);
ServiceProviderrouter.route('/food/getFoods').get(getFoods);
ServiceProviderrouter.route('/food/getFoodsbyCategory').get(getFoodByCategory);
ServiceProviderrouter.route('/food/updateFood/:SerialNo').post(updateFood);
ServiceProviderrouter.route('/food/deleteFood/:SerialNo').post(deleteFoods);

//Offer routes
ServiceProviderrouter.route('/offer/addOffer').post(addOffer);
ServiceProviderrouter.route('/offer/getOffer').get(getOffers);
ServiceProviderrouter.route('/offer/updateOffer').post(updateOffer);
ServiceProviderrouter.route('/offer/deleteOffer').post(deleteOffers);

export default ServiceProviderrouter;