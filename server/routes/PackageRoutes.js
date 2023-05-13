import express from "express";
import { addPackage, getPackages, removeItemsFromPackage, updatePackage} from "../controllers/PackageController.js";

const PackageRoutes = express.Router();

PackageRoutes.route("/packages").post(addPackage);
PackageRoutes.route("/packages").get(getPackages);
PackageRoutes.route("/packages").patch(updatePackage);
PackageRoutes.route("/packageitem").patch(removeItemsFromPackage);

export default PackageRoutes;
