import adminModel from "../models/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import validate from "./validator.js";
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const addAdmins = async (req, res) => {
  const salt = 10;
  const {
    adminName,
    adminEmail,
    adminRole,
    adminPassword,
    // adminBranch,
  } = req.body;

  try {
    const { error, value } = validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const adminExist = await adminModel.findOne({ adminEmail });

    if (adminExist) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already created" });
    }

    const hashAdminPassword = await bcrypt.hash(adminPassword, salt);

    const user = new adminModel({
      adminName,
      adminEmail,
      adminRole,
      // adminBranch,
      adminPassword: hashAdminPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // Updated to "1d"
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 1000,
    });
    // return res.status(200).json({
    //     success: true,  })

    // sending welcome email

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail, // Ensure adminEmail is correctly passed here
      subject: "Welcome to Vaulitfy administration dashboard",
      text: `Welcome to Vaulitfy. Your account has been created with email id: ${adminEmail} and password: ${adminPassword}`,
    });

    res.status(200).json({ success: true, message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findById(id).select("-adminPassword");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findByIdAndDelete(id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminName, adminEmail, adminRole, adminState } = req.body;

    const updatedAdmin = await adminModel
      .findByIdAndUpdate(
        id,
        { adminName, adminEmail, adminRole, adminState },
        { new: true, runValidators: true }
      )
      .select("-adminPassword");

    if (!updatedAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await adminModel.find().select("-adminPassword");
    res.status(200).json({ success: true, admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;
    if (!isValidEmail(adminEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }
    const user = await adminModel.findOne({ adminEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(adminPassword, user.adminPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, adminRole: user.adminRole },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    ); // Updated to "23h"
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 23 * 60 * 60 * 1000, // Updated to 23 hours
    });

    // Access token (short-lived)
    const accessToken = jwt.sign(
      { id: user._id, adminRole: user.adminRole },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Refresh token (longer-lived)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "login successfully",
      token,
      userData: {
        adminName: user.adminName,
        adminEmail: user.adminEmail,
        adminRole: user.adminRole,
        isVerified: user.isVerified,
        createdAt: user.createAt,
        updatedAt: user.updatedAt,
        _id: user._id,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "login successfully",
      text: `Welcome to Vaulitfy, you have successfully logged in to your account`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};

const sendVerifyOTP = async (req, res) => {
  try {
    const { adminEmail } = req.body;

    const user = await adminModel.findOne({ adminEmail });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    if (!isValidEmail(user.adminEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = OTP;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.adminEmail, // Ensure user.adminEmail is correctly passed here
      subject: "Account Verification OTP",
      text: `Your OTP is ${OTP}, verify your account using this OPT. Note: this OPT expires in 24 hours`,
    });
    res.json({ success: true, message: "Verification OTP sent" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { Id, OTP } = req.body;
  if (!Id || !OTP) {
    return res.json({ success: false, message: "missing Details" });
  }
  try {
    const user = await adminModel.findById(Id);
    if (!user) {
      return res.json({ success: false, message: " User not found" });
    }

    if (Id.verifyOtp === "" || Id.verifyOtp !== OTP) {
      return res.json({ success: false, message: "Invalid OPT" });
    }

    if (Id.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: " OPT expire" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Email verified" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const isAuthenticate = async (req, res) => {
  try {
    return res.json({ success: true, message: "user is authenticated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const sendResetOpt = async (req, res) => {
  const { adminEmail } = req.body;

  if (!adminEmail) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await adminModel.findOne({ adminEmail });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!isValidEmail(user.adminEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOpt = OTP;
    user.resetotpexpireat = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.adminEmail, // Ensure user.adminEmail is correctly passed here
      subject: "Password reset OTP",
      text: `Your OTP for resetting your password is ${OTP}. Use this OTP to proceed with resetting your password.`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const resetpassword = async (req, res) => {
  const { adminEmail, OTP, newPassword } = req.body;

  if (!adminEmail || !OTP || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    const user = await adminModel.findOne({ adminEmail });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOpt === "" || user.resetOpt !== OTP) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetotpexpireat < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.adminPassword = hashedpassword;
    user.resetOpt = "";
    user.resetotpexpireat = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
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
  sendResetOpt,
  resetpassword,
};
