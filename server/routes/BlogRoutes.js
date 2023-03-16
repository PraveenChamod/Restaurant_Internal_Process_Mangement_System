import express from 'express';
import { AddReview } from '../controllers/BlogController.js';


const BlogRoutes = express.Router();

BlogRoutes.route('/Blogs').post(AddReview);

export default BlogRoutes;