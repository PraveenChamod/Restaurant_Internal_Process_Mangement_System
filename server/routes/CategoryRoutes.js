import express from 'express';
import { addCategories, image, getCategories } from '../controllers/CategoryController.js';

const CategoryRoutes = express.Router();

CategoryRoutes.route('/Category').post(image,addCategories);
CategoryRoutes.route('/Categories').get(getCategories);

export default CategoryRoutes;