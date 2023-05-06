import express from "express";
import {
  addOffer,
  deleteOffers,
  getOffers,
  image,
  updateOffer,
  getOfferById,
} from "../controllers/OfferController.js";
import { requireAuth } from "../middleware/Authmiddleware.js";

const OfferRoutes = express.Router();

OfferRoutes.route("/Offer").post(requireAuth, image, addOffer);
OfferRoutes.route("/Offers").get(getOffers);
OfferRoutes.route("/Offer/:id").get(getOfferById);
OfferRoutes.route("/Offer/:id").patch(requireAuth,image, updateOffer);
OfferRoutes.route("/Offer/:id").delete(requireAuth, deleteOffers);

export default OfferRoutes;
