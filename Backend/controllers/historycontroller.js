const Bill= require("./../models/billSchema");
const User= require("./../models/userSchema");
const Payments= require("./../models/paymentSchema");

exports.sendBills = async( req,res)=>{
   try{
    const {societyid}= req.params;
      const data= await Bill.find({societyid}).sort({createdAt:-1});
      res.json(data);
   }
   catch(err){
    res.status(500).json({message:"Server down"})
   }
}

exports.sendDetails= async (req,res)=>{
   try{
       const {billid}= req.params;
       const basic=await Bill.findById(billid);

       const paidPayments= await Payments.find({
         bill:billid,
         status:"paid"
       }).populate("user","name flat");

       const pendingPayments= await Payments.find({
         bill:billid,
         status:"pending"
       }).populate("user","name flat");

       const paid= paidPayments.map(p=>({
         _id:p.user._id,
         name:p.user.name,
         flat:p.user.flat
       }))

       const pending= pendingPayments.map(p=>({
         _id:p.user._id,
         name:p.user.name,
         flat:p.user.flat
       }))
            
       res.json({
         basic,
         paid,
         pending
       })

   }
   catch(err){
      res.status(500).json({message:"server down"})
   }
}

exports.getMyPayment =async(req,res)=>{
  try{
      const userid= req.user._id;
      const payments=await Payments.find({user:userid})
      .populate("bill","reason month year amount deadline")
      .sort({createdAt:-1})
       
      const formatted= payments.map(p =>({
        id:p._id,
        bill:p.bill.reason,
        month:p.bill.month,
        year:p.bill.year,
        amount:p.bill.amount,
        status:p.status,
        deadline:p.bill.deadline
      }))
      res.json(formatted);
    }
  catch(err){
    res.status(500).json({message:"server down"});
  }
} 