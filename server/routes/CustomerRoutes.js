import express from 'express';
import { UploadProfileImage } from '../controllers/AuthController.js';
import {  OrderItem, RegisterCustomer, UpdateProfile } from '../controllers/CustomerControll.js';
import { requireAuth } from '../middleware/Authmiddleware.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(RegisterCustomer);
Customerrouter.route('/UpdateProfile/:Email').patch(requireAuth,UploadProfileImage,UpdateProfile);
Customerrouter.route('/OrderItem').post(requireAuth,OrderItem);

export default Customerrouter;