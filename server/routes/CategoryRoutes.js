import express from 'express';
import { addCategories, image } from '../controllers/CategoryController.js';

const CategoryRoutes = express.Router();

CategoryRoutes.route('/Category').post(image,addCategories);

export default CategoryRoutes;