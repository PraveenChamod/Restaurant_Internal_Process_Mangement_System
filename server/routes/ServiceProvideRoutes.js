import express from 'express';
import { addItems, deleteFoodBySerialNo, getFoods, getFoodsByCategory, RegisterOutletStaff } from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

ServiceProviderrouter.route('/RegisterOutletStaff').post(RegisterOutletStaff);

ServiceProviderrouter.route('/AddItems').post(addItems);

ServiceProviderrouter.route('/getFoods').get(getFoods);

ServiceProviderrouter.route('/getFoodsByCategory').get(getFoodsByCategory);

ServiceProviderrouter.route('/deleteFoodBySerialNo/:SerialNo').delete(deleteFoodBySerialNo);

export default ServiceProviderrouter;