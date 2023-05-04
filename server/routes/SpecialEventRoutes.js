import express from "express";
import {addSpecialEvent,getSpecialEvents,} from "../controllers/SpecialEventController.js";

const SpecialEventRoutes = express.Router();

SpecialEventRoutes.route("/SpecialEvent").post(addSpecialEvent);

SpecialEventRoutes.route("/SpecialEvents").get(getSpecialEvents);

export default SpecialEventRoutes;
