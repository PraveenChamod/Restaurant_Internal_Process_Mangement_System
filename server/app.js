import express from "express";
import cookieParser from 'cookie-parser';
import AdminRoutes from "./routes/AdminRoutes.js";
import Customerrouter from './routes/CustomerRoutes.js';
import AuthRoutes from "./routes/AuthRoutes.js";
import { requireAuth } from "./middleware/Authmiddleware.js";
import path from "path";
import ServiceProviderrouter from "./routes/ServiceProvideRoutes.js";

const app = express();

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/api/v1/customer',requireAuth,Customerrouter);

app.use('/api/v1/admin',requireAuth,AdminRoutes);

app.use('/api/v1/Auth', AuthRoutes);

app.use('/api/v1/serviceProvider',requireAuth,ServiceProviderrouter);

export default app;




