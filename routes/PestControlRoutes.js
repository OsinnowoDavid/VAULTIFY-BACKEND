import express from "express";
import {
  addPestControlService,
  getAllPestControlServices,
  getPestControlServiceById,
  updatePestControlService,
  deletePestControlService
} from "../controller/PestControlController.js";

const PestControlRoutes = express.Router();

// Create
PestControlRoutes.post("/add-pest-control-service", addPestControlService);

// Read all
PestControlRoutes.get("/get-all-pest-control-services", getAllPestControlServices);

// Read one by ID
PestControlRoutes.get("/get-pest-control-service/:id", getPestControlServiceById);

// Update by ID
PestControlRoutes.put("/update-pest-control-service/:id", updatePestControlService);
  
// Delete by ID
PestControlRoutes.delete("/delete-pest-control-service/:id", deletePestControlService);

export default PestControlRoutes;
