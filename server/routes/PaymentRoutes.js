import express from 'express';
import { pay } from '../controllers/PaymentController.js';


const PaymentRoute = express.Router();

PaymentRoute.route('/Payment').post(pay);

export default PaymentRoute;
