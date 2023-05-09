import express from "express";
import {
  addCategories,
  image,
  getCategories,
  updateCategory,
} from "../controllers/CategoryController.js";

const CategoryRoutes = express.Router();

CategoryRoutes.route("/Category").post(image, addCategories);
CategoryRoutes.route("/Categories").get(getCategories);
CategoryRoutes.route("/Category").patch(image,updateCategory);

export default CategoryRoutes;
