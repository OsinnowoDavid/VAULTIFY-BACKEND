import express from "express";
import {
  addGardeningService,
  getAllGardeningServices,
  getGardeningServiceById,
  updateGardeningService,
  deleteGardeningService
} from "../controller/gardenServiceControlloer.js";

const GardenServiceRoutes = express.Router();

// Create
GardenServiceRoutes.post("/add-gardening-service", addGardeningService);

// Read all
GardenServiceRoutes.get("/get-all-gardening-services", getAllGardeningServices);

// Read one by ID
GardenServiceRoutes.get("/get-gardening-service/:id", getGardeningServiceById);

// Update by ID
GardenServiceRoutes.put("/update-gardening-service/:id", updateGardeningService);

// Delete by ID
GardenServiceRoutes.delete("/delete-gardening-service/:id", deleteGardeningService);

export default GardenServiceRoutes;
