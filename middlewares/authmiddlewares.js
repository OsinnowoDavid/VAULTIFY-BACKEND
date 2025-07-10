import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminModel from "../models/adminSchema.js";
dotenv.config();
// import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your actual JWT secret
    const user = await adminModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 🔥 This is key!
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authenticateUser;

// export default verifyToken;

// const verifyToken = (req, res, next) => {
//     let token;
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     console.log("Request Headers:", req.headers); // Log all request headers
//     console.log("Authorization Header:", authHeader); // Log the authorization header

//     if (authHeader && authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//     } else if (req.cookies && req.cookies.token) {
//         token = req.cookies.token;
//     }

//     if (!token) {
//         return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;

//         console.log("The decoded user is", req.user);
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: "Token is not valid" });
//     }
// };

// export default verifyToken;     
