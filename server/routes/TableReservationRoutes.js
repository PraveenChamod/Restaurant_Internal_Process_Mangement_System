import express from 'express';
import { ReserveTable, SendReservationConfirmation, ViewPendingReservations, ViewReservation } from '../controllers/TableReservationControll.js';

const TableReservationRoutes = express.Router();

TableReservationRoutes.route('/TableReservation').post(ReserveTable);
TableReservationRoutes.route('/PendingReservations').get(ViewPendingReservations);
TableReservationRoutes.route('/Reservation/:_id').get(ViewReservation);
TableReservationRoutes.route('/ReservationConfirmation/:_id').post(SendReservationConfirmation);

export default TableReservationRoutes;