import ServiceModel from "../models/serviceSchema.js";

const registerService = async (req, res) => {
    try {
        // Validate request body
        const { serviceName, providerName, serviceType, ratingReview, contactInfo, availability, profileDetails } = req.body;
        if (!serviceName || !providerName || !serviceType || !ratingReview || !contactInfo || !availability || !profileDetails) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const serviceData = req.body;
        const newService = new ServiceModel(serviceData);
        await newService.save();
        res.status(201).json({ message: "Service registered successfully", service: newService });
    } catch (error) {
        res.status(500).json({ message: "Error registering service", error: error.message });
    }
}

const getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", error: error.message });
    }
}
const getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await ServiceModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({ message: "Error fetching service", error: error.message });
    }
}
const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const updatedData = req.body;
        const updatedService = await ServiceModel.findByIdAndUpdate(serviceId, updatedData, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        res.status(500).json({ message: "Error updating service", error: error.message });
    }
}
export { registerService, getAllServices, getServiceById, updateService };
