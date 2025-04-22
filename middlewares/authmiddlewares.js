import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret if hardcoding
    req.user = decoded; // 👈 This is crucial
    console.log('✅ Token verified. User:', decoded);
    next();
  } catch (err) {
    console.error('❌ JWT Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

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

export default verifyToken;
