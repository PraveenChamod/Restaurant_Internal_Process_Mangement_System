import express from 'express';
import { addItems, deleteItemBySerialNo, getItems, getItemByCategory, RegisterOutletStaff, addFoods } from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ServiceProviderrouter.route('/RegisterOutletStaff').post(RegisterOutletStaff);

ServiceProviderrouter.route('/AddItems').post(addItems);

ServiceProviderrouter.route('/getItems').get(getItems);

ServiceProviderrouter.route('/getItemsByCategory').get(getItemByCategory);

ServiceProviderrouter.route('/deleteItemBySerialNo/:SerialNo').delete(deleteItemBySerialNo);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Staff-Member++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ServiceProviderrouter.route('/Staff-Member/AddFoods').post(addFoods);

export default ServiceProviderrouter;