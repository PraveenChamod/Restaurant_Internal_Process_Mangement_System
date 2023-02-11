import express from 'express';
import { UploadProfileImage } from '../controllers/AuthController.js';
import {  RegisterCustomer, UpdateProfile } from '../controllers/CustomerControll.js';
import { requireAuth } from '../middleware/Authmiddleware.js';

const Customerrouter = express.Router();

Customerrouter.route('/AddCustomer').post(RegisterCustomer);
Customerrouter.route('/UpdateProfile/:Email').patch(requireAuth,UploadProfileImage,UpdateProfile);

export default Customerrouter;