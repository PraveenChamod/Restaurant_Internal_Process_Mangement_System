import express from "express";
import cookieParser from 'cookie-parser';
import AdminRoutes from "./routes/AdminRoutes.js";
import Customerrouter from './routes/CustomerRoutes.js';
import AuthRoutes from "./routes/AuthRoutes.js";
import { requireAuth } from "./middleware/Authmiddleware.js";
import ServiceProviderrouter from "./routes/ServiceProvideRoutes.js";
import cookieSession from "cookie-session";
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import session from 'express-session';
import Strategy from 'passport-google-oauth20';
const app = express();

dotenv.config();
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
const GoogleStrategy = Strategy.Strategy;
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  app.use(cors(corsOptions));

  passport.use(new GoogleStrategy({
    clientID: '833391486306-n7554irik6mh166s3b235okmp2ougmrv.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/api/v1/sessions/oauth/google'
  }, (accessToken, refreshToken, profile, done) => {
    // Here you can save the user's information to your database
    // or use it to authenticate the user with your application
    done(null, profile);
  }));
  
  // Serialize the user's profile to the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  // Deserialize the user's profile from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  // Use Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/images', express.static('images/Users'));
app.use('/Foodimages', express.static('images/Foods'));

app.use('/api/v1/customer',Customerrouter);

app.use('/api/v1/admin',requireAuth,AdminRoutes);

app.use('/api/v1/Auth', AuthRoutes);

app.use('/api/v1/serviceProvider',requireAuth,ServiceProviderrouter);

export default app;




