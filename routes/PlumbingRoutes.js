import express from "express";
import {
  addPlumbingService,
  getAllPlumbingServices,
  getPlumbingServiceById,
  updatePlumbingService,
  deletePlumbingService
} from "../controller/PlumblingServiceCOntroller.js";

const PlumbingRoutes = express.Router();

// Create
PlumbingRoutes.post("/add-plumbing-service", addPlumbingService);

// Read all
PlumbingRoutes.get("/get-all-plumbing-services", getAllPlumbingServices);

// Read one by ID
PlumbingRoutes.get("/get-plumbing-service/:id", getPlumbingServiceById);

// Update by ID
PlumbingRoutes.put("/update-plumbing-service/:id", updatePlumbingService);

// Delete by ID
PlumbingRoutes.delete("/delete-plumbing-service/:id", deletePlumbingService);

export default PlumbingRoutes;
