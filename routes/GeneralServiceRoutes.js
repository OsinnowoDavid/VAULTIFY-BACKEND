import express from "express";
import {
  addGeneralService,
  getAllGeneralServices,
  getGeneralServiceById,
  updateGeneralService,
  deleteGeneralService
} from "../controller/GeneralServiceController.js";

const GeneralServiceRoutes = express.Router();

// Create
GeneralServiceRoutes.post("/add-general-service", addGeneralService);

// Read all
GeneralServiceRoutes.get("/get-all-general-services", getAllGeneralServices);

// Read one by ID
GeneralServiceRoutes.get("/get-general-service/:id", getGeneralServiceById);

// Update by ID
GeneralServiceRoutes.put("/update-general-service/:id", updateGeneralService);

// Delete by ID
GeneralServiceRoutes.delete("/delete-general-service/:id", deleteGeneralService);

export default GeneralServiceRoutes;
