import express from "express";


const app = express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));

export default app;




