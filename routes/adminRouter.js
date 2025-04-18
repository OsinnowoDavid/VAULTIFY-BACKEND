import express from "express";
import {
    addAdmins,
    getAdminById,
    deleteAdmin,
    editAdmin,
    getAllAdmin,
    loginAdmin,
    logout,
    sendVerifyOTP,
    verifyEmail,
    isAuthenticate,
    resetpassword,
    sendResetOpt,
} from "../controller/adminController.js";
import { userAuth } from "../controller/userUth.js";
import authorizationRole from "../middlewares/rolemiddleware.js";
import verifyToken from "../middlewares/authmiddlewares.js";
import { getUserData } from "../controller/usercontroller.js";
const adminRouter = express.Router();


adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logout);
adminRouter.post("/sendVerifyOtp",userAuth, sendVerifyOTP);
adminRouter.post("/verifyAccount", userAuth, verifyEmail);
adminRouter.get("/isAuth",userAuth, isAuthenticate);

adminRouter.post("/sendRestOtp",userAuth, sendResetOpt);
adminRouter.post("/resetPasswrod",userAuth, resetpassword);

// adminRouter.get("/getuserdata", getuserdata);


adminRouter.get("/getUserData", userAuth, getUserData)
adminRouter.get("/getAllAdmin", userAuth,  getAllAdmin);
adminRouter.post("/registerAdmin", addAdmins);
adminRouter.get("/getAdminById/:id", userAuth, authorizationRole("superadmin"), getAdminById);
adminRouter.delete("/deleteAdmin/:id", deleteAdmin);
adminRouter.put("/editAdmin/:id", userAuth, authorizationRole("superadmin"), editAdmin);

export default adminRouter;
