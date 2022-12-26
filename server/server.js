import mongoose from "mongoose";
import app from "./app";
const mongodb = "";

const PORT = process.env.PORT || 5000;

mongoose.connect(mongodb).then(()=>{
    console.log(`Serve is listning to port ${PORT}`);
    app.listen(5000)
}).catch((err)=>{
    console.log(err);
})