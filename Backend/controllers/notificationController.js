const Notification =require("./../models/notification");
const User = require("./../models/userSchema");

exports.createNotification=async(req,res)=>{
  try{
        const {title,message,type}= req.body;

        const members= await User.find({
          societyid:req.user.societyid
        })

        const notifications= members.map(m=>({
          user:m._id,
          title,
          message,
          type
        }))
        await Notification.insertMany(notifications);
        req.io.to(req.user.societyid.toString()).emit("newNotification",{title,message,type});
        res.json({message:"notification sent"});
  }
  catch(err){
    res.status(500).json({message:"server down"});
  }
}

exports.sendNotifications = async (req,res)=>{
   try{
       const notification= await Notification.find({
        user:req.user._id
       }).sort({createdAt:-1})

       res.json(notification);
   } 
   catch(err){
    res.status(500).json({message:"server down"});
   }
}

exports.markread= async (req,res)=>{
  try{
      const {id}= req.params;
      await Notification.findByIdAndUpdate(id,{
        read:true
      })
      res.json({message:"updated"});
  }
  catch(err){
    res.status(500).json({message:"server down"});
  }
}