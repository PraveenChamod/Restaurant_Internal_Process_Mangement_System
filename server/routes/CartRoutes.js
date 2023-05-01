import express from "express";
import {
  AddToCart,
  removeFoodFromCart,
  viewCart,
} from "../controllers/CartController.js";

const CartRoutes = express.Router();

CartRoutes.route("/CartItem").post(AddToCart);
CartRoutes.route("/CartItems").get(viewCart);
CartRoutes.route("/FoodItem").patch(removeFoodFromCart);

export default CartRoutes;
