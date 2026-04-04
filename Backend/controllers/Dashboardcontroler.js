const Payment= require("./../models/paymentSchema");
const Bill= require('./../models/billSchema');
const User = require("./../models/userSchema");
const Complaint= require("./../models/complaintSchema");

exports.getSocietyDasboard= async (req,res)=>{
   try{
     console.log(req.user);
    const society= req.user.societyid;
    const members= await User.countDocuments({
      societyid:society
    })
    
    const bills =await Bill.countDocuments({
      societyid:society
    })

    const payments=await Payment.find({
      societyid:society
    }).populate("bill");

    let totalcollection=0;
    let pendingCollection=0;

    payments.forEach(p=>{
      if(p.status==="paid"){
        totalcollection+=p.bill.amount
      }
      else if(p.status==="pending" || p.status==="failed"){
        pendingCollection+= p.bill.amount
      }
    })

    const complaints= await Complaint.countDocuments({
      society:society,
      status:"undone"
    })

    res.json({
      members,
      bills,
      totalcollection,
      pendingCollection,
      complaints
    })
   }
   catch(err){
    res.status(500).json({message:"Error in getting society dashboard"});
   }
}