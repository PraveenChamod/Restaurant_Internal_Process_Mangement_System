import express from 'express';
import { addDatingTableItems, image} from '../controllers/DatingTableController.js';

const DatingTableItemRoutes = express.Router();

DatingTableItemRoutes.route('/DatingTableItem').post(image,addDatingTableItems);

export default DatingTableItemRoutes;