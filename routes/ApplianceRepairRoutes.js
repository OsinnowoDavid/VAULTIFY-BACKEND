import express from "express"
import {
  addApplianceRepairService,
  getAllApplianceRepairServices,
  getApplianceRepairServiceById,
  updateApplianceRepairService,
  deleteApplianceRepairService
} from "../controller/ApplianceRepairController.js";

const ApplianceRoutes = express.Router();

// Create
ApplianceRoutes.post("/appliance-repair", addApplianceRepairService);

// Read all
ApplianceRoutes.get("/get-all-appliance-repair-services", getAllApplianceRepairServices);

// Read one by ID
ApplianceRoutes.get("/get-appliance-repair-service/:id", getApplianceRepairServiceById);

// Update by ID
ApplianceRoutes.put("/update-appliance-repair-service/:id", updateApplianceRepairService);

// Delete by ID
ApplianceRoutes.delete("/delete-appliance-repair-service/:id", deleteApplianceRepairService);

export default ApplianceRoutes;
