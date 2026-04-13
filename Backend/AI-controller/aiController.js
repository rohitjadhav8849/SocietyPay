const axios =require("axios");
const Payments= require("../models/paymentSchema");

exports.predictPaymentRisk = async(req,res) =>{
   try{
      const {userid}= req.params;
      const payments= await Payments.find({user:userid}).populate("bill");
      let late_payments= 0;
      let missed_payments=0;
      
      payments.forEach(p=>{
        if(p.status==="pending"){
          const deadline = new Date(p.bill.deadline)
          const today=new Date();
          if(today>deadline){
            late_payments++;
          }
        }
        if(p.status==="failed"){
          const deadline = new Date(p.bill.deadline)
          const today=new Date();
          if(today>deadline){
            missed_payments++;
          }
        }
      })
    
      const resp=await axios.post(
        "http://127.0.0.1:8000/predict-payment-risk",
        {
          late_payments,
          missed_payments
        }
      )

      res.json({
        late_payments,
        missed_payments,
        risk:resp.data.risk,
      })
   }
   catch(err){
        res.status(500).json({message:"AI service error"})
   } 
}