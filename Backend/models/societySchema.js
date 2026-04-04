const mongoose =require("mongoose");

const societySchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  address:String,
  city:String,
  state:String,
  pincode:Number,
  wings:[
    {
      type:String,
    }
  ],
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  
},{timestamps:true})

module.exports=mongoose.model("Society",societySchema);