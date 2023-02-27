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
const app = express();
dotenv.config();
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
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
  
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/api/v1/customer',Customerrouter);

app.use('/api/v1/admin',requireAuth,AdminRoutes);

app.use('/api/v1/Auth', AuthRoutes);

app.use('/api/v1/serviceProvider',requireAuth,ServiceProviderrouter);

export default app;




