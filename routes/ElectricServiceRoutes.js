import express from "express";
import {
  addElectricalService,
  getAllElectricalServices,
  getElectricalServiceById,
  updateElectricalService,
  deleteElectricalService
} from "../controller/ElectricalServiceController.js";

const ElectricRoutes = express.Router();

// Create
ElectricRoutes.post("/add-electrical-service", addElectricalService);

// Read all
ElectricRoutes.get("/get-all-electrical-services", getAllElectricalServices);

// Read one by ID
ElectricRoutes.get("/get-electrical-service/:id", getElectricalServiceById);

// Update by ID
ElectricRoutes.put("/update-electrical-service/:id", updateElectricalService);

// Delete by ID
ElectricRoutes.delete("/delete-electrical-service/s:id", deleteElectricalService);

export default ElectricRoutes;
