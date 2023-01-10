import express from 'express';
import { RegisterCustomer } from '../controllers/CustomerControll.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(RegisterCustomer);

export default Customerrouter;