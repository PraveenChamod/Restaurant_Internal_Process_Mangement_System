import express from 'express';
import { getUserProfile, LogInUser, LogoutUser } from '../controllers/AuthController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';

const AuthRoutes = express.Router();

AuthRoutes.route('/LoginUser').post(LogInUser);

AuthRoutes.route('/getProfile').get(requireAuth,getUserProfile);

AuthRoutes.route('/logout').get(LogoutUser);

export default AuthRoutes;