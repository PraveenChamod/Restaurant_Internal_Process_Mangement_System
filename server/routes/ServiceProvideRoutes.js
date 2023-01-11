import express from 'express';
import { RegisterOutletStaff } from '../controllers/ServiceProvidersControll.js';

const ServiceProviderrouter = express.Router();

ServiceProviderrouter.route('/RegisterOutletStaff').post(RegisterOutletStaff);

export default ServiceProviderrouter;