import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
  strategy,
  serialize,
  deserialize,
} from "./controllers/AuthController.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import { requireAuth } from "./middleware/Authmiddleware.js";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import ItemsRoutes from "./routes/ItemsRoutes.js";
import FoodRoutes from "./routes/FoodsRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import DatingTableItemRoutes from "./routes/DatingTableItemRoutes.js";
import SpecialEventRoutes from "./routes/SpecialEventRoutes.js";
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
import { GetReviews } from "./controllers/BlogController.js";
import StocksOrderRoutes from "./routes/StocksOrderRoutes.js";

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static("public"));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/public/offers", getOffers);
app.use("/api/v1/public/blogs", GetReviews);

app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  session({
    secret: "resturent secret key",
    resave: false,
    saveUninitialized: false,
    rolling: true,
  })
);

// Use Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use("google", strategy);

// Configure Passport serialize and deserialize functions
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

app.use("/images", express.static("images/Users"));
app.use("/Foodimages", express.static("images/Foods"));
app.use("/offerimages", express.static("images/Offers"));
app.use("/blogimages", express.static("images/Users"));
app.use("/Categoryimages", express.static("images/Categories"));
app.use("/Datingtableitemimages", express.static("images/DatingTableItems"));

app.use("/api/v1/Auth", AuthRoutes);

app.use("/api/v1/", UserRoutes);

app.use("/api/v1/", requireAuth, ItemsRoutes);

app.use("/api/v1", OfferRoutes);

app.use("/api/v1/", requireAuth, FoodRoutes);

app.use("/api/v1/", requireAuth, CategoryRoutes);

app.use("/api/v1/", requireAuth, DatingTableItemRoutes);

app.use("/api/v1/", requireAuth, SpecialEventRoutes);

app.use("/api/v1/", requireAuth, BlogRoutes);

app.use("/api/v1/", requireAuth, TableRoutes);

app.use("/api/v1", requireAuth, OrderRoutes);

app.use("/api/v1", requireAuth, CartRoutes);

app.use("/api/v1/", requireAuth, TableReservationRoutes);

app.use("/api/v1/", requireAuth, StocksOrderRoutes);

app.use("/api/v1/", requireAuth, SupplierItemsRoutes);

app.use("/api/v1/", PaymentRoute);

export default app;
