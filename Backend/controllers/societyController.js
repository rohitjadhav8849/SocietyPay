//this will return usesrs connected to specific society

const user=require("../models/userSchema");
const Chat =require("./../models/chatSchema");
const Announcement =require("./../models/announcementSchema");

exports.sendMessage= async (req,res)=>{
  try{
      const {message} =req.body;
      const chat = await Chat.create({
        societyid:req.user.societyid,
        sender:req.user._id,
        message
      })
      await chat .populate("sender","name _id");
      req.io.to(req.user.societyid.toString()).emit("receiveMessage",chat);
      res.json(chat);
  }
  catch(err){
    res.status(500).json({
      message:"server down"
    })
  }
}
exports.getMessage= async (req,res)=>{
  try{
     const chats= await Chat.find({
      societyid:req.user.societyid
     }).populate("sender","name _id")
     .sort({createdAt:1});

     res.json(chats);
  }
  catch(err){
    res.status(500).json({
      message:"server down"
    })
  }
}

exports.sendAnnouncement= async (req,res)=>{
  try{
       const {message}= req.body;
       const announcement=await Announcement.create({
           societyid:req.user.societyid,
           sender:req.user._id,
           message
       }) 
       await announcement.populate("sender", "name _id");
       req.io.to(req.user.societyid.toString()).emit("receiveAnnouncement",announcement);
       res.json(announcement);   
  } 
  catch(err){
   res.status(500).json({message:"server down"});
  }
}

exports.getAnnouncement= async (req,res)=>{
    try{
        const chats= await Announcement.find({
          societyid:req.user.societyid,
        }).populate("sender","name _id")
        .sort({createdAt:1});
        res.json(chats);
    }
    catch(err){
      res.status(500).json({message:"server down"});
    }
}
exports.pinAnnouncement=async (req,res)=>{
  try{
       const {id}=req.params;
       console.log(id);
       await Announcement.updateMany({societyid:req.user.societyid},{pinned:false});
       const updated =await Announcement.findByIdAndUpdate(id,{pinned:true},{new:true}).populate("sender","name _id");
       req.io.to(req.user.societyid.toString()).emit("pinUpdated",updated);
       res.json(updated);
  }
  catch(err){
    res.status(500).json({message:"server error"})
  }
}
exports.sendpin= async (req,res)=>{
   try{
       const pinmessage= await Announcement.findOne({
        societyid:req.user.societyid,
        pinned:true
      }).sort({updatedAt:-1});
      // console.log("the pin message is",pinmessage);
      res.json(pinmessage);
   }
   catch(err){
       res.status(500).json({message:"server down"});
   }
}

exports.unpinAnnouncement=async (req,res)=>{
  try{
       const {id}= req.params;
       console.log(id);
       const updated = await Announcement.findByIdAndUpdate(id,{pinned:false},{new:true}).populate("sender","name _id");
       req.io.to(req.user.societyid.toString()).emit("unpinUpdated",updated);
  }
  catch(err){
    res.status(500).json({message:"server down"})
  }
}

exports.editAnnouncement =async (req,res)=>{
   try{
       const {message}= req.body;
       const {id}=req.params;
       console.log(message," ",id);
       const updated = await Announcement.findByIdAndUpdate(id,{message:message},{new:true});
       req.io.to(req.user.societyid.toString()).emit("editUpdated",updated);
   }
   catch(err){
     res.status(500).json({message:"server down"});
   }
}

exports.deleteAnnouncement= async (req,res)=>{
    try{
        const {id}=req.params;
        const deleted = await  Announcement.findByIdAndDelete(id);
        req.io.to(req.user.societyid.tostring()).emit("deleteAnnouncement",deleted);
        res.json({message:"deleted"});
    }
    catch(err){
      res.status(500).json({message:"server down"})
    }
}

exports.getSocietyMembers= async (req,res)=>{
   try{
      const societyid=req.user.societyid;
      console.log(societyid);
      const members=await user.find({societyid}).select("-password").sort({"flat.wing":1,"flat.number":1});
      res.json(members);
   }
   catch(err){
      res.status(500).json({message:"server error"});
   }
}

exports.verifyMember =async (req,res)=>{
   try{
       const {userid,documentid}=req.body;
       const updateUser = await user.findOneAndUpdate(
         {
           _id: userid,
           "documents._id":documentid
         },
         { $set: { "documents.$.verified": true } },
         { new: true }
       );
      res.json(updateUser);
   }
   catch(err){
   res.status(500).json({message:"server error"});
   }
}

exports.getMemberDetails=async (req,res)=>{
   try{
      const memberid= req.params.id;
      const member = await user.findById(memberid).select("-password");

      if(!member){
         return res.status(404).json({message:"member not found"});
      }
      res.json(member);
   }
   catch(err){
      res.status(500).json({message:"server down"});
   }
}

const society=require("../models/societySchema");

exports.getAllScoities= async (req,res)=>{
  console.log("req received");
    try{
      const socities = await society.find().select("name city state").sort({name:1});
      console.log(socities);
    res.json(socities)
    }
    catch(err){
      res.status(500).json({message:"server error"});
    }
}