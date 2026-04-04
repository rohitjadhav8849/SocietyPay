const mongoose =require("mongoose");

const announcementSchema= new mongoose.Schema({
  societyid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Society",
    required:true
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  message:{
    type:String,
    required:true
  }, 
  pinned:{
    type:Boolean,
    default:false
  }
},{
  timestamps:true
});

module.exports =mongoose.model("Announcement",announcementSchema);