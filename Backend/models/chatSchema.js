const mongoose =require("mongoose");

const chatschema =new mongoose.Schema({
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
},{
  timestamps:true
});

module.exports=mongoose.model("Chat",chatschema);


