import mongoose from "mongoose";

const SecuritySchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    providerName: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    ratingReview: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    profileDetails: {
        type: String,
        required: true
    }
});

const SecurityModel = mongoose.model("SecurityService", SecuritySchema);
export default SecurityModel;
