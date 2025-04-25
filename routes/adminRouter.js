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
import authenticateUser from "../middlewares/authmiddlewares.js";
import { getUserData } from "../controller/usercontroller.js";

const adminRouter = express.Router();


adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logout);
adminRouter.post("/sendVerifyOtp",userAuth, sendVerifyOTP);
adminRouter.post("/verifyAccount", userAuth, verifyEmail);
adminRouter.get("/isAuth",userAuth, isAuthenticate);

adminRouter.post("/sendRestOtp",userAuth, sendResetOpt);
adminRouter.post("/resetPasswrod",authenticateUser, resetpassword);

// adminRouter.get("/getuserdata", getuserdata);


adminRouter.get("/getUserData", userAuth, getUserData)
adminRouter.get("/getAllAdmin", userAuth,  getAllAdmin);
adminRouter.post("/registerAdmin", userAuth, addAdmins);
adminRouter.get("/getAdminById/:id", userAuth,  getAdminById);
adminRouter.delete("/deleteAdmin/:id",userAuth, deleteAdmin);
adminRouter.put("/editAdmin/:id", userAuth, editAdmin);

export default adminRouter;
