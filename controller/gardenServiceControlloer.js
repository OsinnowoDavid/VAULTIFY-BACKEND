import GardeningModel from "../models/GardeningService.js";

// Create a new gardening service
export const addGardeningService = async (req, res) => {
    try {
        const { serviceName, providerName, serviceType, ratingReview, contactInfo, availability, profileDetails } = req.body;
        if (!serviceName || !providerName || !serviceType || !ratingReview || !contactInfo || !availability || !profileDetails) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existing = await GardeningModel.findOne({ serviceName });
        if (existing) {
            return res.status(400).json({ success: false, message: "Service already exists" });
        }
        const newService = new GardeningModel({ serviceName, providerName, serviceType, ratingReview, contactInfo, availability, profileDetails });
        await newService.save();
        return res.status(201).json({ success: true, message: "Service Added Successfully", service: newService });
    } catch (error) {
        console.error("Error adding service:", error);
        return res.status(500).json({ success: false, message: "Failed to Add Service", error: error.message });
    }
};

// Get all gardening services
export const getAllGardeningServices = async (req, res) => {
    try {
        const services = await GardeningModel.find();
        return res.status(200).json({ success: true, services });
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({ success: false, message: "Failed to Fetch Services", error: error.message });
    }
};

// Get a gardening service by ID
export const getGardeningServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const service = await GardeningModel.findById(id);
        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, service });
    } catch (error) {
        console.error("Error fetching service by ID:", error);
        return res.status(500).json({ success: false, message: "Failed to Fetch Service", error: error.message });
    }
};

// Update a gardening service by ID
export const updateGardeningService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const updatedService = await GardeningModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, message: "Service Updated Successfully", service: updatedService });
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ success: false, message: "Failed to Update Service", error: error.message });
    }
};

// Delete a gardening service by ID
export const deleteGardeningService = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const deletedService = await GardeningModel.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        return res.status(200).json({ success: true, message: "Service Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        return res.status(500).json({ success: false, message: "Failed to Delete Service", error: error.message });
    }
};
