const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
  societyid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Society"
  },
  name:String,
  mobile: {type:String,unique:true},
  password:String,
  role:{type:String,enum:["member","secretary","security"]},
  flat:{
    wing:String,
    number:String,
  },
  documents:[
    {
      type:{
        type:String,
        enum:["aadhar","bill","selfie"]
      },
      uri:String,
      verified:{
        type:Boolean,
        default:false
      }
    }
  ]
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);