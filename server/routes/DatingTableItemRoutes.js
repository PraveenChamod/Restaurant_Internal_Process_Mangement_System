import express from 'express';
import { addDatingTableItems, image, getDatingTableItems} from '../controllers/DatingTableController.js';

const DatingTableItemRoutes = express.Router();

DatingTableItemRoutes.route('/DatingTableItem').post(image,addDatingTableItems);

DatingTableItemRoutes.route('/DatingTableItems').get(getDatingTableItems);

export default DatingTableItemRoutes;