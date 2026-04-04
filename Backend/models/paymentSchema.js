const mongoose  = require("mongoose");

const paymentSchema= new mongoose.Schema({
  bill:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Bill",
     required:true
  },
  societyid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Society",
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
     type:String,
     enum:["pending","failed","paid"],
     default:"pending"
  },
  razorpay_order_id:{
     type:String,
  },
  razorpay_payment_id:{
    type:String
  },
  razorpay_signature:{
    type:String
  }
},{timestamps:true})

module.exports=mongoose.model("Payments",paymentSchema);