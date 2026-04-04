const User = require("../models/userSchema");
const Society=require("../models/societySchema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.register= async(req,res)=>{
  try{
      console.log("the data after registration is:",req.body);
      const {name,mobile,password,role,society,flat,documents}=req.body;
      const hashPassword= await bcrypt.hash(password,10);
      //created bcoz we want to allot this to secretary 
      let societyid=null;
      if(role==="secretary"){
          const newsociety=await Society.create({
            name:society.name,
            address:society.address,
            city:society.city,
            wings:society.wings,
            state:society.state
          })
          societyid=newsociety._id;
      }
      if(role=="member"){
         const existingScoiety=await Society.findById(society);
         if(!existingScoiety){
          return res.status(400).json({message:"Society not found"});
         }
         societyid=existingScoiety._id;
      }
      //now making the user
      const user= await User.create({
        name,
        mobile,
        password:hashPassword,
        role,
        societyid,
        flat,
        documents
      });
      console.log(user);
      res.json(user);
  }
  catch (err){
     console.log(err);
  }
}

exports.login=async(req,res)=>{
   try{
      const {mobile,password}=req.body;
      const user= await User.findOne({mobile:mobile});
      console.log("the user from login api",user);
      if(!user) return res.status(400).json({message:"user not found"});
      
      const isMatch= await bcrypt.compare(password,user.password);
      if(!isMatch) return res.send(404).json({message:"wrong password"});

      //now token generation
      const token =jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
      );
      const userData={
        _id:user._id,
        name:user.name,
        role:user.role,
        flat:user.flat,
        mobile:user.mobile,
        societyid:user.societyid,
        documents:user.documents
      }
     res.json({token,user:userData});
   }
   catch (err){
     console.log(err);
   }
}

exports.Sendname=async (req,res)=>{
  try{
       const {id}= req.params;
       const valuee=await Society.findById(id);
       console.log("the valuee is ",valuee);
       res.json(valuee.name);
  }
  catch(err){
    res.status(500).json({message:"server down"});
  }
}