import express from 'express';
import { addOffer, deleteOffers, getOffers, image, updateOffer } from '../controllers/OfferController.js';

const OfferRoutes = express.Router();

OfferRoutes.route('/Offer').post(image,addOffer);
OfferRoutes.route('/Offers').get(getOffers);
OfferRoutes.route('/Offer/:SerialNo').patch(updateOffer);
OfferRoutes.route('/Offer/:SerialNo').delete(deleteOffers);


export default OfferRoutes;