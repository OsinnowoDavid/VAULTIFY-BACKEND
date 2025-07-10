import express from "express";
import {
  addLandScapingService,
  getAllLandScapingServices,
  getLandScapingServiceById,
  updateLandScapingService,
  deleteLandScapingService
} from "../controller/LandScapingServiceControler.js";

const LandScapingRoutes = express.Router();

// Create
LandScapingRoutes.post("/add-land-scaping-service", addLandScapingService);

// Read all
LandScapingRoutes.get("/get-all-land-scaping-services", getAllLandScapingServices);

// Read one by ID
LandScapingRoutes.get("/get-land-scaping-service/:id", getLandScapingServiceById);

// Update by ID
LandScapingRoutes.put("/update-land-scaping-service/:id", updateLandScapingService);

// Delete by ID
LandScapingRoutes.delete("/delete-land-scaping-service/:id", deleteLandScapingService);

export default LandScapingRoutes;
