import mongoose, { model } from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        adminName: { type: String, require: true, unique: true },
        adminEmail: { type: String, require: true, unique: true },
        adminRole: {
            type: String,
            require: true,
            enum: ["Superadmin", "Admin", "User"],
            default: "user",
        },
        adminBranch: { type: String, require: true },
        adminPassword: { type: String, require: true },
        isActive: { type: Boolean, require: true },
        verifyOtp: { type: String, default: "" },
        verifyOtpExpireAt: { type: Number, default: 0 },
        isVerified: { type: Boolean, default: false },
        resetOpt: { type: String, default: "" },
        resetotpexpireat: { type: String, default: 0 },
        registerationDate: { type: Date, default: Date.now },
    },
    { timestamps: true },
    { minimize: false },
);
const adminModel = mongoose.model.admin || mongoose.model("admin", adminSchema);

export default adminModel;
