import express from 'express';
import { CreateCustomer } from '../controllers/CustomerControll.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(CreateCustomer);

export default Customerrouter;