import express from 'express';
import * as l  from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++Manager++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

ServiceProviderrouter.route('/RegisterOutletStaff').post(l.RegisterOutletStaff);
ServiceProviderrouter.route('/Orders/getDeliverers').get(l.getAvailableDeliverers);
ServiceProviderrouter.route('/AddSupplierOrder').get(l.addSupplierOrder);
export default ServiceProviderrouter;