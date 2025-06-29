import express from "express";
import { registerService, getAllServices, getServiceById,updateService , deleteService} from "../controller/Services.js";
const serviceBookingRoutes = express.Router();


serviceBookingRoutes.post("/addServices", registerService);
serviceBookingRoutes.get("/getServices", getAllServices);
serviceBookingRoutes.get("/getServices/:id", getServiceById);
serviceBookingRoutes.put("/updateServices/:id", updateService);
serviceBookingRoutes.delete("/deleteServices/:id", deleteService);

export default serviceBookingRoutes;