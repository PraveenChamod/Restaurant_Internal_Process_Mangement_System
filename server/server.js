import mongoose from "mongoose";
import app from "../server/app.js";
const mongodb =
  "mongodb+srv://RESTAURANT_MANAGEMENT_SYSTEM:expg17KEpe9pz8iJ@cluster0.nlnqgmw.mongodb.net/?retryWrites=true&w=majority";

const PORT =  5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(mongodb)
  .then(() => {
    console.log(`Serve is listning to port ${PORT}`);
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
