import express from 'express';
import { PlaceOrder, RegisterCustomer, UpdateProfile } from '../controllers/CustomerControll.js';
import { requireAuth } from '../middleware/Authmiddleware.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(RegisterCustomer);
Customerrouter.route('/UpdateProfile/:Email').patch(requireAuth,UpdateProfile);
Customerrouter.route('/PlaceOrder/:_id').post(requireAuth,PlaceOrder);

export default Customerrouter;