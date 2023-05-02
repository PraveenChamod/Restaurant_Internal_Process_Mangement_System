import express from "express";
import passport from "passport";
import {
  ForgotPassword,
  getUserProfile,
  LogInUser,
  LogoutUser,
  PasswordReset,
  sendOTP,
  UploadProfileImage,
} from "../controllers/AuthController.js";
import { requireAuth } from "../middleware/Authmiddleware.js";

const AuthRoutes = express.Router();

AuthRoutes.route("/LoginUser").post(LogInUser);

AuthRoutes.route("/Profile").get(requireAuth, getUserProfile);

AuthRoutes.route("/ProfilePicture").patch(requireAuth, UploadProfileImage);

AuthRoutes.route("/logout").get(LogoutUser);

AuthRoutes.route("/ResetPassword/:Email").patch(PasswordReset);

AuthRoutes.route("/OTP").post(sendOTP);

AuthRoutes.route("/Forgotpassword").patch(ForgotPassword);

AuthRoutes.route("/callback").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    res.redirect("/Profile");
  }
);

AuthRoutes.route("/Profile").get((req, res) => {
  res.json({ user: req.user.user1, token: req.user.token });
});

export default AuthRoutes;
