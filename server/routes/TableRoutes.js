import express from 'express';
import { AddTable, ViewTables } from '../controllers/TableController.js';


const TableRoutes = express.Router();

TableRoutes.route('/Table').post(AddTable);
TableRoutes.route('/Tables').get(ViewTables);

export default TableRoutes;