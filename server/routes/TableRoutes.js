import express from 'express';
import { AddTable, getAvailableTables, ViewTables } from '../controllers/TableController.js';


const TableRoutes = express.Router();

TableRoutes.route('/Table').post(AddTable);
TableRoutes.route('/Tables').get(ViewTables);
TableRoutes.route('/availabletables').get(getAvailableTables);

export default TableRoutes;