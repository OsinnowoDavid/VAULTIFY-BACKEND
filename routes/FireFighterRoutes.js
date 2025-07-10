import express from "express";
import {
  addFireFightersService,
  getAllFireFightersServices,
  getFireFightersServiceById,
  updateFireFightersService,
  deleteFireFightersService
} from "../controller/FireFighterController.js";

const FireFighterRoutes = express.Router();

// Create
FireFighterRoutes.post("/add-fire-fighter-service", addFireFightersService);

// Read all
FireFighterRoutes.get("/get-all-fire-fighter-services", getAllFireFightersServices);

// Read one by ID
FireFighterRoutes.get("/get-fire-fighter-service/:id", getFireFightersServiceById);

// Update by ID
FireFighterRoutes.put("/update-fire-fighter-service/:id", updateFireFightersService);

// Delete by ID
FireFighterRoutes.delete("/delete-fire-fighter-service/:id", deleteFireFightersService);

export default FireFighterRoutes;
