import express from 'express';
import { LogInCustomer, RegisterCustomer } from '../controllers/CustomerControll.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(RegisterCustomer);

Customerrouter.route('/CustomerLogin').post(LogInCustomer);

export default Customerrouter;