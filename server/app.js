import express from "express";
import AdminRoutes from "./routes/AdminRoutes.js";
import Customerrouter from './routes/CustomerRoutes.js';

const app = express();

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));



app.use('/api/v1/customer',Customerrouter);

app.use('/api/v1/admin',AdminRoutes);

export default app;




