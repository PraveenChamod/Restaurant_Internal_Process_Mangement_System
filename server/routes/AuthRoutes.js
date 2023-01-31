import express from 'express';
import { getUserProfile, LogInUser, LogoutUser, PasswordReset, UploadProfileImage } from '../controllers/AuthController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';



const AuthRoutes = express.Router();

AuthRoutes.route('/LoginUser').post(LogInUser);

AuthRoutes.route('/getProfile').get(requireAuth,getUserProfile);

AuthRoutes.route('/uploadProfilePicture').post(UploadProfileImage);

AuthRoutes.route('/logout').get(LogoutUser);

AuthRoutes.route('/ResetPassword/:Email').patch(PasswordReset);

export default AuthRoutes;