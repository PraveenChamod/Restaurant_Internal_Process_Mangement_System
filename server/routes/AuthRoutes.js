import express from 'express';
import passport from 'passport';
import { getUserProfile, LogInUser, LogoutUser, PasswordReset, UploadProfileImage } from '../controllers/AuthController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';



const AuthRoutes = express.Router();

AuthRoutes.route('/LoginUser').post(LogInUser);

AuthRoutes.route('/getProfile').get(requireAuth,getUserProfile);

AuthRoutes.route('/uploadProfilePicture').patch(requireAuth,UploadProfileImage);

AuthRoutes.route('/logout').get(LogoutUser);

AuthRoutes.route('/ResetPassword/:Email').patch(PasswordReset);

// AuthRoutes.route('/google').get(passport.authenticate('google', ["profile", "email"]));

// AuthRoutes.route('/google/callback').get(
// 	passport.authenticate('google', {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

export default AuthRoutes;