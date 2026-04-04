const jwt=require("jsonwebtoken");
const User =require("../models/userSchema");

//this checks that the user is logged in or not before allowing other routes
//checks user

exports.protect=async (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try{
    if(!token){
      return res.status(401).json({message:"No token"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id);
    req.user=user;//we are sending the user info to backend
    next();
  }
  catch(err){
    res.status(401).json({message:"Invalid token"});
  }
}