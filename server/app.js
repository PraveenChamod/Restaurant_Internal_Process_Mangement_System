import express from "express";
import Customerrouter from './routes/CustomerRoutes.js';

const app = express();

app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));



app.use('/api/v1/customer',Customerrouter);

export default app;




