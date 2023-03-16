import express from 'express';
import passport from 'passport';
import { getUserProfile, LogInUser, LogoutUser, passportSAuth, PasswordReset, redirect, UploadProfileImage } from '../controllers/AuthController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';



const AuthRoutes = express.Router();

AuthRoutes.route('/LoginUser').post(LogInUser);

AuthRoutes.route('/Profile').get(requireAuth,getUserProfile);

AuthRoutes.route('/ProfilePicture').patch(requireAuth,UploadProfileImage);

AuthRoutes.route('/auth/google').get(passportSAuth);

AuthRoutes.route('sessions/oauth/google').get(passportSAuth,redirect)

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