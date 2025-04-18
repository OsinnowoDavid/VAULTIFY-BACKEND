const authorizationRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.adminRole)) {
        return res.status(403).json({ message: "You are not authorized to access this route" });
      }
  
      // If user has the required role, allow the request to proceed
      next();
    };
  };
  
  export default authorizationRole;
  

// const authorizationRole = (...allowroles) => {
//     return (req, res, next) => {
//         if (!allowroles.includes(req.user.adminRole)) {
//             return res.status(403).json({ message: "You are not authorized to access this route" });
//         }else{
//             return res.status(200).json({ message: "You are authorized to access this route" });
//         }
//         next();
//     };
// };

// export default authorizationRole;
