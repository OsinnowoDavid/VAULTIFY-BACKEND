import ApplianceRepairModel from "../models/ApplianceRepair.js";

// Create a new appliance repair service
export const addApplianceRepairService = async (req, res) => {
    try {
        const { serviceName, providerName, serviceType, ratingReview, contactInfo, availability, profileDetails } = req.body;
        if (!serviceName || !providerName || !serviceType || !ratingReview || !contactInfo || !availability || !profileDetails) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existing = await ApplianceRepairModel.findOne({ serviceName });
        if (existing) {
            return res.status(400).json({ success: false, message: "Service already exists" });
        }
        const newService = new ApplianceRepairModel({ serviceName, providerName, serviceType, ratingReview, contactInfo, availability, profileDetails });
        await newService.save();
        return res.status(201).json({ success: true, message: "Service Added Successfully", service: newService });
    } catch (error) {
        console.error("Error adding service:", error);
        return res.status(500).json({ success: false, message: "Failed to Add Service", error: error.message });
    }
};

// Get all appliance repair services
export const getAllApplianceRepairServices = async (req, res) => {
    try {
        const services = await ApplianceRepairModel.find();
        return res.status(200).json({ success: true, services });
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({ success: false, message: "Failed to Fetch Services", error: error.message });
    }
};

// Get an appliance repair service by ID
export const getApplianceRepairServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const service = await ApplianceRepairModel.findById(id);
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, service });
    } catch (error) {
        console.error("Error fetching service by ID:", error);
        return res.status(500).json({ success: false, message: "Failed to Fetch Service", error: error.message });
    }
};

// Update an appliance repair service by ID
export const updateApplianceRepairService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const updatedService = await ApplianceRepairModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, message: "Service Updated Successfully", service: updatedService });
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ success: false, message: "Failed to Update Service", error: error.message });
    }
};

// Delete an appliance repair service by ID
export const deleteApplianceRepairService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const deletedService = await ApplianceRepairModel.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, message: "Service Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        return res.status(500).json({ success: false, message: "Failed to Delete Service", error: error.message });
    }
};
