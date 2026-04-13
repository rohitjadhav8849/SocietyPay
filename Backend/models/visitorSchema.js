const mongoose= require("mongoose");

const visitorSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  phone:String,
  flat:{
    wing:String,
    number:String
  },
  purpose:String,
  entryTime:{
     type:Date,
     default:Date.now
  },
  exitTime:Date,
  societyid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Society"
  },
  securityid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  anomalyRisk:{
    type:String,
    default:"normal"
  }
},{timestamps:true});

module.exports= mongoose.model("Visitor",visitorSchema);