import express from 'express';
import { addOffer, deleteOffers, getOffers, image, updateOffer } from '../controllers/OfferController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';

const OfferRoutes = express.Router();

OfferRoutes.route('/Offer').post(requireAuth,image,addOffer);
OfferRoutes.route('/Offers').get(getOffers);
OfferRoutes.route('/Offer/:SerialNo').patch(requireAuth,updateOffer);
OfferRoutes.route('/Offer/:SerialNo').delete(requireAuth,deleteOffers);


export default OfferRoutes;