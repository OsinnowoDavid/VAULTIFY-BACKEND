import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
const userAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
export  {userAuth}


// import jwt from "jsonwebtoken"
// const userAuth = async ( req,res, next) =>{
// const {token} = req.cookies;
// if (!token ){
//  return res.json({success:false, message:"not authorized, Login Again"})
// }
// try {
//   const tokenDecode=  jwt.verify(token, process.env.JWT_SECRET)

//   if(tokenDecode.id){
//     req.body.userId = tokenDecode.id
//   } else{ return res.json({success:false, message:"not authorized login again "})
//   }
  
// next()
    
// } catch (error) {
//      res.json({success:false, error:message})
    
// }
// }

// export {userAuth}