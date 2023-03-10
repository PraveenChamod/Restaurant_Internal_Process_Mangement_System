import express from 'express';
import { addItems, deleteItemBySerialNo, getItemByCategory, getItems } from '../controllers/ItemsControll.js';

const ItemsRoutes = express.Router();

ItemsRoutes.route('/Item').post(addItems);
ItemsRoutes.route('/Items').get(getItems);
ItemsRoutes.route('/Items/:category').get(getItemByCategory);
ItemsRoutes.route('/Items/:serialNo').delete(deleteItemBySerialNo);

export default ItemsRoutes;