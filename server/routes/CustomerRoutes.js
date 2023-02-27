import express from 'express';
import passport from 'passport';
import { UploadProfileImage } from '../controllers/AuthController.js';
import {  AddReview, OrderItem, PlaceOrder, RegisterCustomer, ReserveTable, UpdateProfile } from '../controllers/CustomerControll.js';
import { requireAuth } from '../middleware/Authmiddleware.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(RegisterCustomer);
Customerrouter.route('/UpdateProfile/:Email').patch(requireAuth,UpdateProfile);
Customerrouter.route('/OrderItem').post(requireAuth,OrderItem);
Customerrouter.route('/PlaceOrder/:_id').post(requireAuth,PlaceOrder);
Customerrouter.route('/ReserveTable').post(requireAuth,ReserveTable);
Customerrouter.route('/Review').post(requireAuth,AddReview);
export default Customerrouter;