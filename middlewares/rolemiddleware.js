import adminModel from "../models/adminSchema.js";

const authorizationRole = (...allowroles) => {
  return async (req, res, next) => {
    try {
      const admin = await adminModel.findById(req.user.id).select("adminRole");

      if (!admin || !allowroles.includes(admin.adminRole)) {
        return res.status(403).json({ message: "You are not authorized to access this route" });
      }

      next(); // ✅ Authorized, move on
    } catch (error) {
      console.error("Authorization error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

export default authorizationRole;


      // if (!allowroles.includes(req.cookies.adminRole)) {
      //   // console.log(req.user)
      //     return res.status(403).json({ message: "You are not authorized to access this route" });
      // }
      // next(); // Proceed if authorized
//   };
// };

// export default authorizationRole;



// const authorizationRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes( req.user.adminRole)) {
// console.log(req.user.adminRole)

//       return res.status(403).json({ message: "You are not authorized to access this route" });
// console.log(req.user.adminRole)

//     }
//     next(); // User is authorized
//   };
// };

// export default authorizationRole;


// const authorizationRole = (...allowedRoles) => {
//     return (req, res, next) => {
//       if (!allowedRoles.includes(req.user.adminRole)) {
//         return res.status(403).json({ message: "You are not authorized to access this route" });
//       }
  
//       // If user has the required role, allow the request to proceed
//       next();
//     };
//   };
  
//   export default authorizationRole;
  
// const authorizationRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     console.log('Request Body:', req); // Log the request body to check if adminRole exists

//     const userRole = req.user?.adminRole; //  Use optional chaining to safely access adminRole

//     if (!userRole) {
//       return res.status(400).json({ message: "adminRole is missing in the request body" });
//     }

//     console.log('User Role:', userRole); // Log the user role

//     if (!allowedRoles.includes(userRole)) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to access this route" });
//     }

//     next(); // Proceed if authorized
//   };
// };

// export default authorizationRole;

// export default authorizationRole;

