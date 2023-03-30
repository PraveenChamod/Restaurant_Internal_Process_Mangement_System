import express from 'express';
import { AddTable, getAvailableTables, getTableById, updateTable, ViewTables } from '../controllers/TableController.js';


const TableRoutes = express.Router();

TableRoutes.route('/Table').post(AddTable);
TableRoutes.route('/Tables').get(ViewTables);
TableRoutes.route('/availabletables').get(getAvailableTables);
TableRoutes.route('/table/:id').get(getTableById);
TableRoutes.route('/table/:id').patch(updateTable);

export default TableRoutes;