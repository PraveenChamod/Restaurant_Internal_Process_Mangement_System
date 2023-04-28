import express from 'express';
import { AddReview, GetReviews } from '../controllers/BlogController.js';


const BlogRoutes = express.Router();

BlogRoutes.route('/Blogs').post(AddReview);
BlogRoutes.route('/Blogss').get(GetReviews);

export default BlogRoutes;