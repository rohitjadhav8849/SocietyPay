const mongoose = require('mongoose');

const complaintSchema= new mongoose.Schema({
  society:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Society",
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  text:{
    type:String,
    required:true
  },
  category:{
    type:String
  },
  priority:{
    type:String
  },
  status:{
    type:String,
    default:"undone"
  }
},{timestamps:true})

module.exports= mongoose.model("Complaint",complaintSchema);