import adminModel from "../models/adminSchema.js";

const getUserData = async (req, res) => {
    try {
        const { Id } = req.body;
        const user = await adminModel.findById(Id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            userData: {
                adminName: user.adminName,
                adminRole: user.adminRole,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { getUserData };
