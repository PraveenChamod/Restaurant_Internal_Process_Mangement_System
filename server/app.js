import express from "express";
import cookieParser from 'cookie-parser';
import AuthRoutes from "./routes/AuthRoutes.js";
import { requireAuth } from "./middleware/Authmiddleware.js";
import cookieSession from "cookie-session";
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import session from 'express-session';
import Strategy from 'passport-google-oauth20';
import ItemsRoutes from "./routes/ItemsRoutes.js";
import FoodRoutes from "./routes/FoodsRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import BlogRoutes from "./routes/BlogRoutes.js";
import TableRoutes from "./routes/TableRoutes.js";
import OfferRoutes from "./routes/OfferRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import TableReservationRoutes from "./routes/TableReservationRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import SupplierItemsRoutes from "./routes/SupplierItemsRoutes.js";

import morgan from "morgan";
import PaymentRoute from "./routes/PaymentRoutes.js";
import { getOffers } from "./controllers/OfferController.js";
import StocksOrderRoutes from "./routes/StocksOrderRoutes.js";




const app = express();

dotenv.config();
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use(morgan('dev'));

const GoogleStrategy = Strategy.Strategy;
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header('Access-Control-Origin', '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  app.use(cors(corsOptions));
  app.use(express.static('public'));
  
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

app.use('/api/v1/public/offers',getOffers);

app.use(cookieParser());
app.use('/images', express.static('images/Users'));
app.use('/Foodimages', express.static('images/Foods'));
app.use('/offerimages', express.static('images/Offers'));
app.use('/Categoryimages', express.static('images/Categories'));

app.use('/api/v1/Auth', AuthRoutes);

app.use('/api/v1/', UserRoutes);

app.use('/api/v1/',requireAuth,ItemsRoutes);

app.use('/api/v1',OfferRoutes);

app.use('/api/v1/',requireAuth,FoodRoutes);

app.use('/api/v1/',requireAuth,CategoryRoutes);

app.use('/api/v1/',requireAuth,BlogRoutes);

app.use('/api/v1/',requireAuth,TableRoutes);

app.use('/api/v1',requireAuth,OrderRoutes);

app.use('/api/v1',requireAuth,CartRoutes);

app.use('/api/v1/',requireAuth,TableReservationRoutes);

app.use('/api/v1/',requireAuth,StocksOrderRoutes);

app.use('/api/v1/',requireAuth,SupplierItemsRoutes);

app.use('/api/v1/',PaymentRoute)

export default app;




