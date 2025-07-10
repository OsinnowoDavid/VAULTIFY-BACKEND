import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
  }

  try { 
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode && tokenDecode.id) {
      req.user = tokenDecode; // ✅ Now req.user.adminRole will work
      return next();
    } else {
      return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
    }
  } catch (error) {
    console.error("Error in userAuth middleware:", error);
    return res.status(401).json({ success: false, message: "Token verification failed, Login Again" });
  }
};

export { userAuth };


// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//     if (tokenDecode.id) {
//       req.user = tokenDecode.id;
//       return next(); // Proceed if the token is valid
//     } else {
//       return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
//     }
//   } catch (error) {
//     console.error("Error in userAuth middleware:", error);
//     return res.status(401).json({ success: false, message: "Token verification failed, Login Again" });
//   }
// };

// export { userAuth };


// import dotenv from "dotenv"
// import jwt from "jsonwebtoken"
// dotenv.config()
// const userAuth = (req, res, next) => {
//   const token = req.cookiesy;
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };
// export  {userAuth}


// import jwt from "jsonwebtoken"
// const userAuth = async ( req,res, next) =>{
// const {token} = req.cookies;
// if (!token ){
//  return res.json({success:false, message:"not authorized, Login Again"})
// }
// try {
//   const tokenDecode=  jwt.verify(token, process.env.JWT_SECRET)

//   if(tokenDecode.id){
//     req.user = tokenDecode.id
//   } else{ return res.json({success:false, message:"not authorized login again "})
//   }
  
// next()
    
// } catch (error) {
//      res.json({success:false, })
//      console.log(error)
    
// }
// }

// export {userAuth}