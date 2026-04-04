const mongoose = require("mongoose");
const billschema= new mongoose.Schema({
  societyid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Society",
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  reason:{
    type:String,
    required:true
  },
  deadline:{
    type:Date,
    required:true
  },
  month:{
    type:String,
    required:true
  },
  year:{
    type:String,
    required:true
  },
  createdBy:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
  },
  status:{
    type:String,
    enum:["active","archive"],
    default:"active"
  }
},{timestamps:true})

module.exports = mongoose.model("Bill",billschema);